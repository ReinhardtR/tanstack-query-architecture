import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createComplex,
  getComplex,
  getComplexes,
  updateComplex,
} from "../api/complex";

// used to create the base query key for the complex queries
// used to invalidate the types of complex queries
// more about how query keys work: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys
// more about how invalidation works: https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
export const complexQueryKeys = {
  all: () => ["complexes"],
  lists: () => [...complexQueryKeys.all(), "list"],
  details: () => [...complexQueryKeys.all(), "detail"],
};

// used to create useQuery hooks
// used to invalidate specific queries, e.g a specific filter or complex by id
export const complexQueries = {
  list: () =>
    queryOptions({
      queryKey: [...complexQueryKeys.lists()],
      queryFn: () => getComplexes(),
      // here you can also add more options to the query: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
      // examples:
      // staleTime: 1000 * 60 * 5, // 5 minutes (basically how long to cache for)
      // refetchInterval: 1000 * 60 * 5, // 5 minutes (refetching in the background)
      // NOTE: even if it refetches, it only re-renders the component if the data has changed
    }),
  detail: (params: { id: string }) =>
    queryOptions({
      queryKey: [...complexQueryKeys.details(), params],
      queryFn: () => getComplex(params),
    }),
};

// custom hooks for each query
export const useComplexList = () => {
  // you can do pre-query stuff here, logging, analytics, params transformations, etc
  return useQuery(complexQueries.list());
};

export const useComplex = (params: { id: string }) => {
  return useQuery(complexQueries.detail(params));
};

// custom hooks for mutations
// updates data on the server and tells other queries to refetch by invalidation
// More about mutations: https://tanstack.com/query/latest/docs/framework/react/guides/mutations
export const useCreateComplex = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComplex,
    onSuccess: () => {
      // new complex created, so invalidate the list query
      queryClient.invalidateQueries({
        queryKey: complexQueryKeys.lists(),
      });
    },
  });
};

export const useUpdateComplex = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComplex,
    onSuccess: (data) => {
      // invalidating specific queries
      queryClient.invalidateQueries(complexQueries.detail({ id: data.id }));
      queryClient.invalidateQueries({ queryKey: complexQueryKeys.lists() });
    },
  });
};

// example to show how we would do optimistic UI - if we wanted to
// More about how to do optimistic UI and optimistic cache updates: https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
export const useUpdateComplexOptimisticUI = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComplex,
    onSuccess: async (data) => {
      // invalidate the data if mutation is succesful to sync with server state
      // important to 'await' it when doing optimistic UI, so that mutation state
      // is in pending state until the refetch is done. The pending state
      // tells the components to show the optimistic UI.
      return await Promise.all([
        queryClient.invalidateQueries({ queryKey: complexQueryKeys.lists() }),
        queryClient.invalidateQueries(complexQueries.detail({ id: data.id })),
      ]);
    },
  });
};
