<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // Vue Router 사용

const goToListPage = () => {
  router.push("/"); // 홈(목록)으로 이동
};

const router = useRouter(); // 페이지 이동을 위한 Vue Router 사용
const newPost = ref({
  title: "",
  content: "",
  writer: "",
});

const createPost = async () => {
  try {
    const response = await axios.post("/api/board/register", newPost.value, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("게시글 등록 성공:", response.data);
    alert("게시글이 성공적으로 등록되었습니다!");

    newPost.value = { title: "", content: "", writer: "" };

    router.push("/");
  } catch (error) {
    console.error("게시글 등록 중 오류 발생:", error);
    alert("게시글 등록 실패!");
  }
};
</script>

<template>
  <div class="container">
    <div class="post-form">
      <h3>새 게시글 작성</h3>
      <input type="text" v-model="newPost.title" placeholder="제목 입력" />
      <textarea v-model="newPost.content" placeholder="내용 입력"></textarea>
      <input type="text" v-model="newPost.writer" placeholder="작성자 입력" />
      <button @click="createPost" class="submit-button">게시글 등록</button>
      <button @click="goToListPage" class="submit-button">목록으로 가기</button>
    </div>
  </div>
</template>

<style scoped>
.register-button {
  margin: 10px 0;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.register-button:hover {
  background-color: #45a049;
}

/* 게시글 작성 폼 스타일 */
.post-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-form input,
.post-form textarea {
  width: 80%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin: 5px 0;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
