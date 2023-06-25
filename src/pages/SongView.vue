<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ErrorMessage } from 'vee-validate';
import { PlayIcon } from '@heroicons/vue/20/solid';
import { songsCollection, commentsCollection, auth } from '@/includes/firebase';
import useUserStore from '@/stores/user';
import usePlayerStore from '@/stores/player';

const userStore = useUserStore();
const playerStore = usePlayerStore();

const route = useRoute();

const song = ref({});
const comments = ref([]);

const commentInSubmission = ref(false);
const commentShowAlert = ref(false);
const commentAlertVariant = ref('');
const commentAlertMessage = ref('');

const schema = {
  comment: 'required'
};

const addComment = async (values, { resetForm }) => {
  commentInSubmission.value = true;
  commentShowAlert.value = true;
  commentAlertVariant.value = 'bg-blue-500';
  commentAlertMessage.value = 'Please, wait. Your comment is being submitted.';

  const comment = {
    content: values.comment,
    datePosted: new Date().toString(),
    sid: route.params.id,
    name: auth.currentUser.displayName,
    uid: auth.currentUser.uid
  };

  await commentsCollection.add(comment);
  await songsCollection.doc(route.params.id).update({
    comment_count: song.value.comment_count + 1
  });

  commentInSubmission.value = false;
  commentAlertVariant.value = 'bg-green-500';
  commentAlertMessage.value = 'Your comment has been submitted.';

  resetForm();
  getComments();
};

const getComments = async () => {
  const snapshots = await commentsCollection.where('sid', '==', route.params.id).get();

  comments.value = [];

  snapshots.forEach((document) => {
    comments.value.push({
      ...document.data(),
      docID: document.id
    });
  });
};

onMounted(async () => {
  const docSnapshot = await songsCollection.doc(route.params.id).get();

  song.value = docSnapshot.data();
  getComments();
});
</script>
<template>
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg bg-gray-950"></div>
    <div class="container mx-auto flex items-center px-4 sm:px-6 lg:px-8">
      <!-- Play/Pause Button -->
      <button
        type="button"
        class="z-10 h-24 w-24 text-3xl bg-white text-gray-950 rounded-full focus:outline-none"
        @click.prevent="playerStore.newSong(song)"
      >
        <PlayIcon class="h-12 w-12 mx-auto" />
      </button>
      <div class="z-10 text-left ml-8">
        <div class="text-3xl font-bold">{{ song.modified_name }}</div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>

  <section class="bg-white">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900">Comments ({{ comments.length }})</h2>
      </div>
      <div v-if="commentShowAlert" class="text-white text-center font-bold p-4 mb-4" :class="commentAlertVariant">
        {{ commentAlertMessage }}
      </div>
      <VeeForm v-if="userStore.userLoggedIn" :validation-schema="schema" class="mb-6" @submit="addComment">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
          <label for="comment" class="sr-only">Your comment</label>
          <VeeField
            as="textarea"
            name="comment"
            rows="6"
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400"
            placeholder="Write a comment..."
          ></VeeField>
          <ErrorMessage name="comment" class="text-red-500" />
        </div>
        <button
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          :disabled="commentInSubmission"
        >
          Post comment
        </button>
      </VeeForm>
      <div v-else>
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
          <textarea
            name="comment"
            rows="6"
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:placeholder-gray-400 cursor-not-allowed"
            placeholder="Login to post a comment..."
            disabled="true"
          ></textarea>
          <ErrorMessage name="comment" class="text-red-500" />
        </div>
      </div>

      <article
        v-for="comment in comments"
        :key="comment.docID"
        class="p-6 mb-6 text-base border border-gray-300 rounded-lg"
      >
        <header class="flex justify-between items-center mb-2">
          <div class="flex flex-col sm:flex-row sm:items-center">
            <p class="inline-flex items-center mr-3 text-sm font-bold text-gray-900">{{ comment.name }}</p>
            <p class="text-sm text-gray-600">
              <time>{{ comment.datePosted }}</time>
            </p>
          </div>
        </header>
        <p class="text-gray-500">
          {{ comment.content }}
        </p>
      </article>
    </div>
  </section>
</template>
