import { setAsyncTimeout } from "../utils";

let complexes = Array.from({ length: 10 }, (_, i) => ({
  id: i.toString(),
  name: `Complex ${i}`,
  address: `Address ${i}`,
  city: `City ${i}`,
  state: `State ${i}`,
  zip: `Zip ${i}`,
}));

export async function getComplex(params: { id: string }) {
  console.log("getting complex", params.id);
  await setAsyncTimeout(1000);

  const complex = complexes.find((c) => c.id === params.id);

  if (!complex) {
    throw new Error("Complex not found");
  }

  return complex;
}

export async function getComplexes() {
  console.log("getting complexes");
  await setAsyncTimeout(1000);
  return complexes;
}

export async function createComplex(params: {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}) {
  await setAsyncTimeout(1000);

  const newComplex = {
    id: complexes.length.toString(),
    name: params.name,
    address: params.address,
    city: params.city,
    state: params.state,
    zip: params.zip,
  };

  complexes = [...complexes, newComplex];

  return newComplex;
}

export async function updateComplex(params: {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}) {
  await setAsyncTimeout(1000);

  if (params.id === "2") {
    throw new Error("Update failed");
  }

  const complex = complexes.find((c) => c.id === params.id);

  if (!complex) {
    throw new Error("Complex not found");
  }

  const updatedComplex = {
    id: params.id,
    name: params.name,
    address: params.address,
    city: params.city,
    state: params.state,
    zip: params.zip,
  };

  // we need to make a new array to trigger a re-render
  // since tanstack react-query uses referential equality to memoize
  // and minimize re-renders, just like react
  // if this came from an api it would be a new object anyway
  complexes = complexes.map((c) => {
    if (c.id === params.id) {
      return updatedComplex;
    }

    return c;
  });

  return updatedComplex;
}
