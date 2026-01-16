import React, { useContext, useRef, useEffect, useState } from 'react';
import { FormContext } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';

function FormPage() {
  const { formData, updateField, updateFileField } = useContext(FormContext);
  const navigate = useNavigate();
  const bioRef = useRef(null);
  const isAr = formData.language === 'ar';
  
  const [stars] = useState([...Array(15)].map(() => ({
    top: Math.random() * 90 + '%',
    left: Math.random() * 95 + '%',
    delay: Math.random() * 4 + 's'
  })));

  const handleTextInput = (field, value) => {
    if (value === "") { updateField(field, value); return; }
    const lastChar = value.charAt(value.length - 1);
    const isArabic = /[\u0600-\u06FF]/.test(lastChar);
    const isEnglish = /[a-zA-Z]/.test(lastChar);

    if (isAr && isEnglish) return; 
    if (!isAr && isArabic) return;
    updateField(field, value);
  };

  const autoExpandBio = () => {
    if (bioRef.current) {
      bioRef.current.style.height = '40px'; 
      bioRef.current.style.height = `${bioRef.current.scrollHeight}px`;
    }
  };

  const handleSaveAndFly = () => {
    alert(isAr 
      ? "تم حفظ بياناتك بنجاح في الكوكيز لمدة 3 أيام! 🚀" 
      : "Data saved successfully to cookies for 3 days! 🚀"
    );
    
    // الانتقال لصفحة المعاينة 
    navigate('/preview');
  };

  useEffect(() => { autoExpandBio(); }, [formData.bio]);

  return (
    <div className="magic-wrapper" dir={isAr ? 'rtl' : 'ltr'}>
      {stars.map((s, i) => (
        <div key={i} className="magic-star" style={{ top: s.top, left: s.left, animationDelay: s.delay }}>⭐</div>
      ))}

      <div className="magic-container">
        <h2 className="magic-title">✨ {isAr ? 'نموذج البيانات' : 'DATA FORM'} ✨</h2>
        
        {/* حقل الاسم */}
        <div className="pixel-input-box">
          <label className="pixel-label">{isAr ? 'الاسم' : 'NAME'}</label>
          <input 
            value={formData.username} 
            onChange={(e) => handleTextInput('username', e.target.value)} 
            placeholder="..." 
          />
        </div>

        {/* حقل النبذة */}
        <div className="pixel-input-box bio-box">
          <label className="pixel-label">{isAr ? '♥ نبذة عني' : '♥ BIO'}</label>
          <textarea 
            ref={bioRef} 
            value={formData.bio} 
            onChange={(e) => { handleTextInput('bio', e.target.value); autoExpandBio(); }} 
            rows="1" 
            placeholder="..." 
          />
        </div>

        <div className="pixel-row">
          {/* اختيار اللغة  */}
          <div className="pixel-input-box flex-1">
            <label className="pixel-label">{isAr ? 'اللغة' : 'LANGUAGE'}</label>
            <select value={formData.language} onChange={(e) => updateField('language', e.target.value)}>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          {/* اختيار الدولة */}
          <div className="pixel-input-box flex-1">
            <label className="pixel-label">{isAr ? 'الدولة' : 'COUNTRY'}</label>
            <select value={formData.location} onChange={(e) => updateField('location', e.target.value)}>
              <option value="UAE">{isAr ? 'الإمارات' : 'UAE'}</option>
              <option value="Syria">{isAr ? 'سوريا' : 'Syria'}</option>
              <option value="Egypt">{isAr ? 'مصر' : 'Egypt'}</option>
            </select>
          </div>
        </div>

        {/* اختيار الجنس */}
        <div className="pixel-input-box">
          <label className="pixel-label">{isAr ? '⚧ الجنس' : '⚧ GENDER'}</label>
          <div className="gender-flex">
            <button type="button" className={formData.gender === 'Female' ? 'active' : ''} onClick={() => updateField('gender', 'Female')}>
               {isAr ? '♀ أنثى' : '♀ Female'}
            </button>
            <button type="button" className={formData.gender === 'Male' ? 'active' : ''} onClick={() => updateField('gender', 'Male')}>
               {isAr ? '♂ ذكر' : '♂ Male'}
            </button>
          </div>
        </div>

        {/* رفع الملفات */}
        <div className="pixel-row">
          <label className="media-btn-pixel">
            {isAr ? '📷 صورة' : '📷 IMG'} 
            <input type="file" hidden accept="image/*" onChange={(e) => updateFileField('image', e.target.files[0])} />
          </label>
          <label className="media-btn-pixel">
            {isAr ? '🎥 فيديو' : '🎥 VID'} 
            <input type="file" hidden accept="video/*" onChange={(e) => updateFileField('video', e.target.files[0])} />
          </label>
        </div>

        <div className="magic-footer-block">
          {/* الموافقة على الشروط  */}
          <div className="accept-container">
            <input 
               type="checkbox" 
               id="agree"
               checked={formData.isAgreed} 
               onChange={(e) => updateField('isAgreed', e.target.checked)} 
            />
            <label htmlFor="agree" className="accept-text">
              {isAr ? ' أوافق على الشروط السابقة' : 'I AGREE TO TERMS'} 💖
            </label>
          </div>
          
          {/* زر الحفظ */}
          <button 
            className="magic-submit-btn" 
            disabled={!formData.isAgreed} 
            onClick={handleSaveAndFly}
          >
            {isAr ? 'حفظ وانطلاق' : 'SAVE & FLY'} 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormPage;