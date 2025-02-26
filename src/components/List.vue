<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

// 게시글 목록 데이터
const boardList = ref([]);

// 게시글 목록 불러오기
const fetchBoardList = async () => {
  try {
    const response = await axios.get("/api/board/list");
    boardList.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("게시글 목록을 불러오는 중 오류 발생:", error);
  }
};

// 페이지 이동 (게시글 등록 페이지로)
const goToRegisterPage = () => {
  router.push("/register");
};

// 컴포넌트가 마운트될 때 게시글 목록 가져오기
onMounted(fetchBoardList);
</script>

<template>
  <div class="container">
    <h2>게시글 목록</h2>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>댓글 수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(board, index) in boardList" :key="board.id">
          <td>{{ index + 1 }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ board.commentNum }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 게시글 작성 버튼 -->
    <div class="post-form">
      <button @click="goToRegisterPage" class="submit-button">게시글 등록하러 가기</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
}

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

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
