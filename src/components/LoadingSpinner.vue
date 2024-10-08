<template>
    <div class="loading__spinner">
      Загружаем...
      <img src="/pickle.png" alt="Loading..." class="loading-image" />
    </div>
  </template>
  
  <style scoped>
  .loading__spinner {
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
  
    .loading-image {
      display: block;
      margin: 20px auto 0;
      width: 100px;
      height: 100px;
      animation: spin 2s linear infinite;
    }
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  