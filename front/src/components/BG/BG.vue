<script></script>

<template>
    <ul class="background">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</template>

<style>

@keyframes cube {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }

  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background: #f0f1f5;
  overflow: hidden;
  z-index: -999;
}

.background li {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  border: solid 1px #0039ad;
  color: transparent;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: cube 7s ease-in forwards infinite;
}

undefined .background li:nth-child(0) {
  animation-delay: 0s;
  left: 60vw;
  top: 57vh;
  border-color: #0046d4;
}

.background li:nth-child(1) {
  animation-delay: 2s;
  left: 12vw;
  top: 30vh;
  border-color: #0046d4;
}

.background li:nth-child(2) {
  animation-delay: 4s;
  left: 39vw;
  top: 87vh;
}

.background li:nth-child(3) {
  animation-delay: 6s;
  left: 73vw;
  top: 80vh;
}

.background li:nth-child(4) {
  animation-delay: 8s;
  left: 29vw;
  top: 3vh;
  border-color: #0046d4;
}

.background li:nth-child(5) {
  animation-delay: 10s;
  left: 41vw;
  top: 16vh;
}

.background li:nth-child(6) {
  animation-delay: 12s;
  left: 17vw;
  top: 90vh;
  border-color: #0046d4;
}

.background li:nth-child(7) {
  animation-delay: 14s;
  left: 86vw;
  top: 75vh;
}

.background li:nth-child(8) {
  animation-delay: 16s;
  left: 55vw;
  top: 64vh;
}

.background li:nth-child(9) {
  animation-delay: 18s;
  left: 98vw;
  top: 7vh;
  border-color: #0046d4;
}

.background li:nth-child(10) {
  animation-delay: 20s;
  left: 57vw;
  top: 51vh;
  border-color: #0046d4;
}

.background li:nth-child(11) {
  animation-delay: 22s;
  left: 25vw;
  top: 38vh;
  border-color: #0046d4;
}

.background li:nth-child(12) {
  animation-delay: 24s;
  left: 34vw;
  top: 92vh;
}

.background li:nth-child(13) {
  animation-delay: 26s;
  left: 21vw;
  top: 10vh;
}

.background li:nth-child(14) {
  animation-delay: 28s;
  left: 71vw;
  top: 61vh;
  border-color: #0046d4;
}

.background li:nth-child(15) {
  animation-delay: 30s;
  left: 94vw;
  top: 15vh;
  border-color: #0046d4;
}

.background li:nth-child(16) {
  animation-delay: 32s;
  left: 2vw;
  top: 70vh;
}

.background li:nth-child(17) {
  animation-delay: 34s;
  left: 90vw;
  top: 27vh;
}

.background li:nth-child(18) {
  animation-delay: 36s;
  left: 78vw;
  top: 42vh;
  border-color: #0046d4;
}

.background li:nth-child(19) {
  animation-delay: 38s;
  left: 50vw;
  top: 98vh;
  border-color: #0046d4;
}

.background li:nth-child(20) {
  animation-delay: 40s;
  left: 11vw;
  top: 35vh;
}

.background li:nth-child(21) {
  animation-delay: 42s;
  left: 6vw;
  top: 45vh;
}

.background li:nth-child(22) {
  animation-delay: 44s;
  left: 65vw;
  top: 23vh;
}

.background li:nth-child(23) {
  animation-delay: 46s;
  left: 80vw;
  top: 55vh;
}

.background li:nth-child(24) {
  animation-delay: 48s;
  left: 45vw;
  top: 77vh;
}
</style>