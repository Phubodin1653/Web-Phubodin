// รหัสที่รองรับ
const validCredentials = [
    { user: "pomin", pass: "3229" },
];

// จำนวนครั้งที่ login ได้
let maxAttempts = parseInt(sessionStorage.getItem("maxAttempts")) || 3;

// ตัวแปรควบคุมการล็อก
let isLocked = sessionStorage.getItem("isLocked") === "true";
let lockTime = 300; // 5 นาที (300 วินาที)
let countdown = null;

// เริ่มนับถอยหลังถ้ากำลังล็อก
if (isLocked) {
    startCooldown();
}

function startCooldown() {
    const errorMsg = document.getElementById("error-msg");
    let timeLeft = parseInt(sessionStorage.getItem("timeLeft")) || lockTime;

    errorMsg.style.color = "orange";
    errorMsg.textContent =
        "คุณได้พยายามเข้าสู่ระบบเกินกำหนด กรุณารอ " + timeLeft + " วินาที";

    countdown = setInterval(() => {
        timeLeft--;
        sessionStorage.setItem("timeLeft", timeLeft);
        errorMsg.textContent =
            "คุณได้พยายามเข้าสู่ระบบเกินกำหนด กรุณารอ " + timeLeft + " วินาที";

        if (timeLeft <= 0) {
            clearInterval(countdown);
            maxAttempts = 3;
            isLocked = false;
            sessionStorage.setItem("maxAttempts", "3");
            sessionStorage.setItem("isLocked", "false");
            sessionStorage.removeItem("timeLeft");
            errorMsg.textContent = "";
        }
    }, 1000);
}

function showLoader() {
    let loader = document.querySelector(".loader-overlay");

    if (!loader) {
        loader = document.createElement("div");
        loader.className = "loader-overlay";
        loader.innerHTML = `
            <div class="spinner"></div>
            <div class="loader-text">กำลังเข้าสู่ระบบ...</div>
        `;
        document.body.appendChild(loader);
    }

    loader.classList.add("active");
}

function hideLoader() {
    const loader = document.querySelector(".loader-overlay");
    if (loader) {
        loader.classList.remove("active");
    }
}

function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    // ตรวจสอบ input ว่าง
    if (!user || !pass) {
        errorMsg.style.color = "red";
        errorMsg.textContent = "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน";
        return;
    }

    // ถ้ากำลังถูกล็อก
    if (isLocked) {
        errorMsg.style.color = "orange";
        errorMsg.textContent = "คุณกำลังถูกล็อก กรุณารอสักครู่";
        return;
    }

    // ตรวจสอบรหัสจากลิสต์
    const isValid = validCredentials.some(
        cred => cred.user === user && cred.pass === pass
    );

    if (isValid) {
        errorMsg.textContent = "";
        showLoader();

        // ✅ ตั้งค่า localStorage ก่อน redirect
        const loginTime = Date.now();
        const sessionDuration = 5 * 60 * 1000; // 5 นาที (ms)
        const expiryTime = loginTime + sessionDuration;
        
        localStorage.setItem("AUTH_LOGIN", "1");
        localStorage.setItem("AUTH_LOGIN_TIME", loginTime.toString());
        localStorage.setItem("AUTH_EXPIRY_TIME", expiryTime.toString());
        
        console.log("✅ Login successful! Stored to localStorage:", { 
          AUTH_LOGIN: "1",
          AUTH_LOGIN_TIME: loginTime,
          AUTH_EXPIRY_TIME: expiryTime
        });
        
        // ล้างค่าฟอร์มและคูลดาว
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        sessionStorage.setItem("maxAttempts", "3");
        sessionStorage.setItem("isLocked", "false");

        setTimeout(() => {
            // ✅ ป้องกันการย้อนกลับ - เพิ่ม state ใน history เพื่อป้องกันกลับไปหน้า login
            history.pushState(null, null, "./");
            window.addEventListener("popstate", (e) => {
                history.pushState(null, null, "./");
            });
            
            // ✅ Redirect ไปเว็บหลัก
            window.location.href = "./";
        }, 1500);
    } else {
        maxAttempts--;
        sessionStorage.setItem("maxAttempts", maxAttempts);

        // ยังเหลือครั้งให้ลอง
        if (maxAttempts > 0) {
            errorMsg.style.color = "red";
            errorMsg.textContent =
                "รหัสผ่านไม่ถูกต้อง คุณเหลือการ login อีก : " + maxAttempts;
        } 
        // ครบจำนวนครั้ง → ล็อก + นับถอยหลัง
        else {
            isLocked = true;
            sessionStorage.setItem("isLocked", "true");
            sessionStorage.setItem("timeLeft", lockTime);
            startCooldown();
        }
    }
}

// เพิ่ม Enter key support
document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (usernameInput) {
        usernameInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                login();
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                login();
            }
        });
    }
});

// Scale + Glow Effect - Minimal & Professional
const loginBox = document.querySelector(".login-box");

if (loginBox) {
    loginBox.addEventListener("mouseenter", () => {
        loginBox.style.transform = "translate(-50%, -50%) scale(1.02)";
        loginBox.style.boxShadow =
            "0 0 80px rgba(0,0,0,0.9), 0 0 30px rgba(255,255,255,0.15)";
    });

    loginBox.addEventListener("mouseleave", () => {
        loginBox.style.transform = "translate(-50%, -50%) scale(1)";
        loginBox.style.boxShadow = "0 0 80px rgba(0,0,0,0.9)";
    });
}
