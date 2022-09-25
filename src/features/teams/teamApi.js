import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?created.email_like=${email}&_sort=timestamp`,
    }),

    // getConversation: builder.query({
    //   query: ({ userEmail, participantEmail }) =>
    //     `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
    // }),
    // addConversation: builder.mutation({
    //   query: ({ sender, data }) => ({
    //     url: "/conversations",
    //     method: "POST",
    //     body: data,
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     const conversation = await queryFulfilled;
    //     if (conversation?.data?.id) {
    //       // silent entry to message table
    //       const users = arg.data.users;
    //       const senderUser = users.find((user) => user.email === arg.sender);
    //       const receiverUser = users.find((user) => user.email !== arg.sender);

    //       //   dispatch(
    //       //     messagesApi.endpoints.addMessage.initiate({
    //       //       conversationId: conversation?.data?.id,
    //       //       sender: senderUser,
    //       //       receiver: receiverUser,
    //       //       message: arg.data.message,
    //       //       timestamp: arg.data.timestamp,
    //       //     })
    //       //   );
    //     }
    //   },
    // }),
    // editConversation: builder.mutation({
    //   query: ({ id, data, sender }) => ({
    //     url: `/conversations/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     // optimistic cache update start
    //     const pathResult = dispatch(
    //       apiSlice.util.updateQueryData(
    //         "getConversations",
    //         arg.sender,
    //         (draft) => {
    //           const draftConversation = draft.data.find((c) => c.id == arg.id);
    //           draftConversation.message = arg.data.message;
    //           draftConversation.timestamp = arg.data.timestamp;
    //         }
    //       )
    //     );
    //     // optimistic cache update end

    //     try {
    //       const conversation = await queryFulfilled;
    //       if (conversation?.data?.id) {
    //         // silent entry to message table
    //         const users = arg.data.users;
    //         const senderUser = users.find((user) => user.email === arg.sender);
    //         const receiverUser = users.find(
    //           (user) => user.email !== arg.sender
    //         );

    //         // const res = await dispatch(
    //         //   messagesApi.endpoints.addMessage.initiate({
    //         //     conversationId: conversation?.data?.id,
    //         //     sender: senderUser,
    //         //     receiver: receiverUser,
    //         //     message: arg.data.message,
    //         //     timestamp: arg.data.timestamp,
    //         //   })
    //         // ).unwrap();

    //         // update messages cache pessimistically start
    //         dispatch(
    //           apiSlice.util.updateQueryData(
    //             "getMessages",
    //             res.conversationId.toString(),
    //             (draft) => {
    //               draft.push(res);
    //             }
    //           )
    //         );
    //         // update messages cache pessimistically end
    //       }
    //     } catch (err) {
    //       pathResult.undo();
    //     }
    //   },
    // }),
  }),
});

export const { useGetTeamsQuery } = teamsApi;
