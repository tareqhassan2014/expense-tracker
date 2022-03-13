import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURI = ' http://localhost:5555/api';

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
    endpoints: (builder) => ({
        //get Categories
        getCategories: builder.query({
            query: () => `category`,
            providesTags: ['categories'],
        }),
        //get Labels
        getLabels: builder.query({
            query: () => 'labels',
            providesTags: ['transactions'],
        }),
        //Add new transaction
        addTransaction: builder.mutation({
            query: (initialTransaction) => ({
                url: 'transaction',
                method: 'POST',
                body: initialTransaction,
            }),
            invalidatesTags: ['transactions'],
        }),

        //Delete record
        deleteTransaction: builder.mutation({
            query: (recordId) => ({
                url: 'transaction',
                method: 'DELETE',
                body: recordId,
            }),
            invalidatesTags: ['transactions'],
        }),
    }),
});

export default apiSlice;
