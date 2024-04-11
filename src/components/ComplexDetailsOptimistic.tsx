import { useComplex, useUpdateComplexOptimisticUI } from "../hooks/complex";

export function ComplexDetails(props: { id: string }) {
  const complexQuery = useComplex({ id: props.id });
  const updateComplexMutation = useUpdateComplexOptimisticUI();

  if (complexQuery.isPending) {
    return <p>Loading...</p>;
  }

  if (complexQuery.isError) {
    return <p>Error: {complexQuery.error.message}</p>;
  }

  // optimistcally update the UI
  const data = updateComplexMutation.isPending
    ? updateComplexMutation.variables
    : complexQuery.data;

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid white",
      }}
    >
      <p>
        ID: {props.id}
        {props.id === "1" && " (Optimistic UI)"}
        {props.id === "2" && " (Optimistic UI - Error)"}
      </p>

      <div
        style={{
          opacity: updateComplexMutation.isPending ? 0.5 : 1,
        }}
      >
        <p>{data.name}</p>
        <p>{data.address}</p>
        <p>{data.zip}</p>
      </div>

      <button
        disabled={updateComplexMutation.isPending}
        onClick={() => {
          updateComplexMutation.mutate({
            ...complexQuery.data,
            name: complexQuery.data.name + " Updated",
            zip: Math.random().toString(),
          });
        }}
      >
        {updateComplexMutation.isPending ? "Updating..." : "Update Complex"}
      </button>
    </div>
  );
}
