const popBtn = document.querySelector("#popBtn");
if (popBtn) {
    popBtn.addEventListener("click", (event) => {
        document.querySelector("#popup").classList.toggle("show");
    })
}

// let Show = class {
//     constructor(button, pageNum) {
//         if (button) {
//             button.addEventListener("click", () => {
//                 document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
//                 document.querySelector(pageNum).classList.add("show")
//             })
//         }
//     }
// }

const p1Btn = document.querySelector("#p1Btn");
if (p1Btn) {
    p1Btn.addEventListener("click", (event) => {
        document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
        document.querySelector("#page1").classList.add("show")
    })
}

const p2Btn = document.querySelector("#p2Btn");
if (p2Btn) {
    p2Btn.addEventListener("click", (event) => {
        document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
        document.querySelector("#page2").classList.add("show");
    })
}

const p3Btn = document.querySelector("#p3Btn");
if (p3Btn) {
    p3Btn.addEventListener("click", (event) => {
        document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
        document.querySelector("#page3").classList.add("show")
    })
}

const p4Btn = document.querySelector("#p4Btn");
if (p4Btn) {
    p4Btn.addEventListener("click", (event) => {
        document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
        document.querySelector("#page4").classList.add("show")
    })
}

const p5Btn = document.querySelector("#p5Btn");
if (p5Btn) {
    p5Btn.addEventListener("click", (event) => {
        document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
        document.querySelector("#page5").classList.add("show")
    })
}

const p6Btn = document.querySelector("#p6Btn");
if (p6Btn) {
    p6Btn.addEventListener("click", (event) => {
        document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
        document.querySelector("#page6").classList.add("show")
    })
}

const p7Btn = document.querySelector("#p7Btn");
if (p7Btn) {
    p7Btn.addEventListener("click", (event) => {
        document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
        document.querySelector("#page7").classList.add("show")
    })
}