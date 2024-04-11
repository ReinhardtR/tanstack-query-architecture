import { useComplexList, useCreateComplex } from "../hooks/complex";

export function CompelxList() {
  const complexListQuery = useComplexList();
  const createComplexMutation = useCreateComplex();

  if (complexListQuery.isPending) {
    return <p>Loading...</p>;
  }

  if (complexListQuery.isError) {
    return <p>Error: {complexListQuery.error.message}</p>;
  }

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid white",
      }}
    >
      {complexListQuery.data.map((complex) => (
        <p key={complex.id}>{complex.name}</p>
      ))}

      <button
        disabled={createComplexMutation.isPending}
        style={{ marginRight: 8 }}
        onClick={() =>
          createComplexMutation.mutate({
            name: "New Complex " + Math.random().toString().slice(2, 6),
            address: "123 Main St",
            city: "Springfield",
            state: "IL",
            zip: "62701",
          })
        }
      >
        {createComplexMutation.isPending ? "Creating..." : "Create Complex"}
      </button>
    </div>
  );
}
