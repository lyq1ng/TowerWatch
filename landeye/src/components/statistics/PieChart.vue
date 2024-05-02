<template>
    <div class="Container">
      <div class="data_title">数据处理情况</div>
      <div v-for="(item, index) in this.data" :key="item.id" class="item" v-if="this.data.length > 0">
        <div class="comment-item">
          <div class="comment-header">
            <img class="comment-avatar" src="/img/logo.png" alt="Avatar">
            <div class="comment-info">
              <div class="comment-author">{{ item.name }}</div>
              <div class="comment-date">{{ item.time.toString().replace("T", " ").replace("Z", "") }}</div>
            </div>
          </div>
          <div class="comment-content">
            {{ item.detail }}
          </div>
          <div class="comment-actions">
            <span class="comment-action">Like</span>
            <span class="comment-action">Overrule</span>
            <span class="comment-action" @click="showDetails">Detail</span>
          </div>
          <!-- 模态框 -->
          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <span class="close" @click="hideModal">&times;</span>
              <div>{{ item.name }}</div>
              <div class="comment-content-full">{{ item.detail }}</div> <!-- 显示完整的评论内容 -->
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      data: '',
      showModal: false,
    }
  },
  methods:{
    fetchData() {
      axios.get('http://8.148.10.46:3050/api/GetLog')
          .then((response) => {
            this.data = response.data;
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
    },
    showDetails() {
      this.showModal = !this.showModal; // 点击详情按钮显示模态框
    },
    hideModal() {
      this.showModal = false; // 关闭模态框
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>
<style>
.Container{
  position:relative;
  width: 48%;
  height: 100%;
  background: #f1f8f0;
  border-radius: 40px;
  overflow-y: auto;
}
.data_title {
  height: 10%;
}

.comment-item {
  border-bottom: 1px solid #ccc;
  padding: 20px;
  border-radius: 20px;
  border-color: #4da479;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-author {
  font-weight: bold;
}

.comment-date {
  font-size: 0.8em;
  color: #888;
}

.comment-content {
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
}

.comment-actions {
  display: flex;
}

.comment-action {
  margin-right: 10px;
  color: #888;
  cursor: pointer;
}

.comment-action:hover {
  color: #333;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 30%;
  height: 30%;
  overflow: auto;
  background-color: rgb(238, 246, 234);
  transform: translate(-50%, -50%);
  border-radius: 30px;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px; /* 可根据需要调整模态框的最大宽度 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

