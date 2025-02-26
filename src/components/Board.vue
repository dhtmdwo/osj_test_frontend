<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const boardIdx = route.params.boardIdx;
const board = ref(null);

const router = useRouter();
const goToListPage = () => {
  router.push("/");
};

const newComment = ref({
  boardId: boardIdx,
  content: "",
  writer: "",
});

const fetchBoardDetail = async () => {
  try {
    const response = await axios.get(`/api/board/${boardIdx}`);
    board.value = response.data;
    console.log("게시글 상세 정보:", response.data);
  } catch (error) {
    console.error("게시글 불러오기 실패:", error);
  }
};

const submitComment = async () => {
  if (!newComment.value.writer || !newComment.value.content) {
    alert("작성자와 내용을 입력해주세요.");
    return;
  }

  try {
    const response = await axios.post("/api/board/comment", newComment.value, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("답글 등록 성공:", response.data);
    alert("답글이 성공적으로 등록되었습니다!");

    newComment.value.content = "";
    newComment.value.writer = "";

    fetchBoardDetail();
  } catch (error) {
    console.error("답글 등록 중 오류 발생:", error);
    alert("답글 등록 실패!");
  }
};

onMounted(fetchBoardDetail);
</script>

<template>
  <div class="container" v-if="board">
    <div class="post-box">
      <h2>{{ board.title }}</h2>
      <p class="writer">
        작성자: <strong>{{ board.writer }}</strong>
      </p>
      <p class="content">{{ board.content }}</p>
    </div>

    <div class="comment-section">
      <h3>댓글 목록</h3>
      <ul>
        <li v-for="comment in board.commentList" :key="comment.idx">
          <div class="comment-box">
            <p class="comment-writer">{{ comment.writer }}</p>
            <p class="comment-content">{{ comment.content }}</p>
          </div>
        </li>
      </ul>
    </div>

    <button @click="goToListPage" class="submit-button">목록으로 가기</button>

    <div class="reply-form">
      <h3>답글 작성</h3>
      <input type="text" v-model="newComment.writer" placeholder="작성자 이름" />
      <textarea v-model="newComment.content" placeholder="답글 내용을 입력하세요."></textarea>
      <button @click="submitComment">답글 등록</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.post-box {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 20px;
}

h2 {
  font-size: 28px;
  color: #333;
  text-align: center;
}

.writer {
  font-size: 18px;
  color: #666;
  text-align: center;
}

.content {
  font-size: 18px;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 10px;
  word-break: break-word;
}

.comment-section {
  padding: 20px;
  background: #f4f4f4;
  border-radius: 10px;
}

.comment-section h3 {
  font-size: 22px;
  color: #007bff;
  margin-bottom: 10px;
}

.comment-section ul {
  list-style: none;
  padding: 0;
}

.comment-box {
  padding: 12px;
  margin-bottom: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #007bff;
}

.comment-writer {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.comment-content {
  font-size: 16px;
  color: #555;
}

.reply-form {
  margin-top: 30px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  text-align: center;
}

.reply-form h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.reply-form input,
.reply-form textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.reply-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reply-form button:hover {
  background-color: #0056b3;
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
