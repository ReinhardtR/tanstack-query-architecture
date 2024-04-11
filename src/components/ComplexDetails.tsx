import { useComplex, useUpdateComplex } from "../hooks/complex";

export function ComplexDetails(props: { id: string }) {
  const complexQuery = useComplex({ id: props.id });
  const updateComplexMutation = useUpdateComplex();

  if (complexQuery.isPending) {
    return <p>Loading...</p>;
  }

  if (complexQuery.isError) {
    return <p>Error: {complexQuery.error.message}</p>;
  }

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid white",
      }}
    >
      <p>ID: {props.id}</p>

      <div>
        <p>{complexQuery.data.name}</p>
        <p>{complexQuery.data.address}</p>
        <p>{complexQuery.data.zip}</p>
      </div>

      <button
        disabled={updateComplexMutation.isPending || complexQuery.isFetching}
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
