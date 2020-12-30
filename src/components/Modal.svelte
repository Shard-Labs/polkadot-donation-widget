<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const close = () => dispatch("close");

  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      close();
      return;
    }
  };
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  class="dot-fixed dot-w-screen dot-h-screen dot-inset-0 dot-flex
    dot-items-center dot-justify-center dot-bg-black dot-bg-opacity-50 dot-p-0
    dot-m-0"
  style="z-index: 999">
  <div
    role="dialog"
    aria-modal="true"
    class="dot-h-full dot-w-full md:dot-h-auto md:dot-max-w-xl dot-rounded
      dot-shadow-md dot-bg-background">
    <div
      class="dot-px-8 dot-py-6 dot-flex dot-justify-between dot-items-center
        dot-bg-white">
      <div class="dot-flex dot-items-center">
        <img
          class="dot-w-6 dot-h-6 dot-mr-2 dot-rounded-full"
          src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDE4NzEuMyAyNTAzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxODcxLjMgMjUwMyI+PHN0eWxlPi5zdDB7ZmlsbDojMWUxZTFlfS5zdDF7ZmlsbDojZTYwMDdhfTwvc3R5bGU+PHRpdGxlPnBvbGthZG90PC90aXRsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTQ4LjIuMEM0MjUuNCAyLjEgMi4xIDQyNS40LjAgOTQ4LjJjMCAxMDQuNyAxNi45IDIwOC43IDUwIDMwOCAyNC43IDY3LjYgOTggMTA0IDE2Ni44IDgzLjEgNjYuNS0yNS41IDEwMS44LTk4LjIgODAuNi0xNjYuMi0yOC4xLTc3LjQtNDAuNi0xNTkuNS0zNi45LTI0MS43IDExLjQtMzc3LjYgMzI2LjctNjc0LjUgNzA0LjMtNjYzLjFzNjc0LjUgMzI2LjcgNjYzLjEgNzA0LjNjLTEwLjcgMzUzLjUtMjg5LjEgNjQwLjYtNjQyLjIgNjYyLjEuMC4wLTEzMy4xIDguMS0xOTkuMyAxNi4yLTI0LjQgMy41LTQ4LjYgOC4zLTcyLjUgMTQuNC0zLjQgMy41LTguOSAzLjUtMTIuNC4xLjAuMC0uMS0uMS0uMS0uMS0yLjQtMy4xLTIuNC03LjUuMC0xMC42bDIwLjYtMTEyLjRMODQ3IDk4MC4xYzE1LTcwLjItMjkuNy0xMzkuMy05OS45LTE1NC4zLTcwLjItMTUtMTM5LjMgMjkuNy0xNTQuMyA5OS45LjAuMC0yOTcuMyAxMzc2LjEtMjk3LjMgMTM4OC42LTE3IDY2LjkgMjMuNCAxMzQuOSA5MC4zIDE1MS45LjcuMiAxLjUuNCAyLjIuNWg2LjljNjYuOCAxNy4zIDEzNS0yMi45IDE1Mi4yLTg5LjcuMy0xLjEuNi0yLjIuOC0zLjQtLjItMi4xLS4yLTQuMi4wLTYuMiAzLjctMTYuMiA0MS4yLTE5OS4zIDQxLjItMTk5LjMgMjguNC0xMzguMiAxMzkuOC0yNDQuMSAyNzkuMi0yNjUuNSAyOC43LTQuNCAxNDkuMy0xMi41IDE0OS4zLTEyLjUgNTIwLjgtNTEuOSA5MDAuOS01MTYuMiA4NDguOS0xMDM3QzE4MTkuMSAzNzguMSAxNDI1LjYgMTIuNCA5NDguMi4weiIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMDA1LjcgMjE4Ni4zYy04NS41LTE3LjgtMTY5LjEgMzcuMS0xODYuOSAxMjIuNS0uMi44LS4zIDEuNi0uNSAyLjQtMTguNSA4NC45IDM1LjMgMTY4LjggMTIwLjMgMTg3LjMuMS4wLjIuMC4zLjFoNC40YzgzLjIgMjAuMSAxNjYuOS0zMS4xIDE4Ni45LTExNC4yLjItLjYuMy0xLjMuNS0xLjl2LTguN0MxMTQ1LjQgMjI4OCAxMDkwLjYgMjIwNS43IDEwMDUuNyAyMTg2LjN6Ii8+PC9zdmc+"
          alt="" />
        <slot name="header" />
      </div>
      <button on:click={close}>
        <svg
          class="dot-w-8 dot-h-8 dot-h-wull dot-fill-current dot-text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"><g data-name="Layer 2">
            <path
              d="M13.41 12l4.3-4.29a1 1 0 10-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 00-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 000 1.42 1 1 0 001.42 0l4.29-4.3 4.29 4.3a1 1 0 001.42 0 1 1 0 000-1.42z"
              data-name="close" />
          </g></svg>
      </button>
    </div>
    <hr />
    <div id="content" class="dot-p-8">
      <slot name="content" />
    </div>
  </div>
</div>
