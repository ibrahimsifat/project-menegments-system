import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members_like=${email}&_sort=timestamp`,
      providesTags: ["Teams"],
    }),
    addTeam: builder.mutation({
      query: (data) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teams"],
    }),
    addTeamMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Teams"],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teams"],
    }),
    updateTeam: builder.mutation({
      query: (data) => {
        let { id, members } = data || {};
        let updatedTeam = {};
        if (members?.length) updatedTeam = { ...updatedTeam, members };
        return {
          url: `/teams/${id}`,
          method: "PATCH",
          body: updatedTeam,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          let { data: updatedTeam } = await queryFulfilled;
          let { email } = getState().auth?.user;

          dispatch(
            teamsApi.util.updateQueryData("getTeams", email, (draft) => {
              return draft.map((team) =>
                team.id === updatedTeam.id
                  ? { ...team, members: updatedTeam.members }
                  : team
              );
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // getConversation: builder.query({
    //   query: ({ userEmail, participantEmail }) =>
    //     `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
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

export const {
  useGetTeamsQuery,
  useAddTeamMutation,
  useAddTeamMemberMutation,
  useDeleteTeamMutation,
} = teamsApi;
