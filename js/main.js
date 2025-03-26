document.addEventListener('DOMContentLoaded', function() {
    // تبديل بين تسجيل الدخول والتسجيل
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // إزالة النشاط من جميع الأزرار والمحتويات
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // إضافة النشاط للعناصر المحددة
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // إظهار/إخفاء كلمة المرور
    const showPasswordBtn = document.querySelector('.show-password');
    const passwordInput = document.getElementById('password');
    
    showPasswordBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
    
    // نافذة الطوارئ
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeModal = document.querySelector('.close-modal');
    
    emergencyBtn.addEventListener('click', function() {
        emergencyModal.style.display = 'block';
        getLocation();
    });
    
    closeModal.addEventListener('click', function() {
        emergencyModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === emergencyModal) {
            emergencyModal.style.display = 'none';
        }
    });
    
    // محاكاة تحديد الموقع
    function getLocation() {
        const locationText = document.getElementById('locationText');
        locationText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جارٍ تحديد موقعك...';
        
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% نجاح
                locationText.innerHTML = '<i class="fas fa-map-marker-alt"></i> تم تحديد موقعك: الرياض، حي الملك فهد';
            } else {
                locationText.innerHTML = '<i class="fas fa-exclamation-circle"></i> تعذر تحديد الموقع، يرجى المحاولة لاحقًا';
            }
        }, 2000);
    }
    
    // معالجة طلب الطوارئ
    const emergencyForm = document.getElementById('emergencyForm');
    
    emergencyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emergencyType = document.getElementById('emergencyType').value;
        const emergencyDesc = document.getElementById('emergencyDesc').value;
        
        // هنا سيتم إرسال البيانات للخادم
        alert(`تم إرسال طلب الطوارئ بنجاح!\nالنوع: ${emergencyType}\nالوصف: ${emergencyDesc}`);
        
        emergencyModal.style.display = 'none';
        emergencyForm.reset();
    });
    
    // معالجة تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // تحقق بسيط (في الواقع سيتم الاتصال بالخادم)
        if (username && password) {
            // توجيه حسب نوع المستخدم (وهمي للبرهنة)
            let role = 'patient';
            if (username.includes('admin')) role = 'admin';
            else if (username.includes('doctor')) role = 'doctor';
            
            // حفظ بيانات الجلسة إذا طلب تذكرني
            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            }
            
            window.location.href = `dashboard.html?role=${role}`;
        } else {
            alert('الرجاء إدخال اسم المستخدم وكلمة المرور');
        }
    });
    
    // استعادة بيانات المستخدم إذا كان قد اختار "تذكرني"
    if (localStorage.getItem('rememberedUser')) {
        document.getElementById('username').value = localStorage.getItem('rememberedUser');
        document.getElementById('remember').checked = true;
    }
});
