import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '../context/FormContext';
import { useNavigate } from 'react-router-dom';
import './PreviewPage.css';

function PreviewPage() {
  const { formData } = useContext(FormContext);
  const navigate = useNavigate();
  const isAr = formData.language === 'ar';
  const [mediaUrls, setMediaUrls] = useState({ img: '', vid: '' });

  useEffect(() => {
    const imgUrl = formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image;
    const vidUrl = formData.video instanceof File ? URL.createObjectURL(formData.video) : formData.video;
    setMediaUrls({ img: imgUrl, vid: vidUrl });
    return () => {
      if (formData.image instanceof File) URL.revokeObjectURL(imgUrl);
      if (formData.video instanceof File) URL.revokeObjectURL(vidUrl);
    };
  }, [formData.image, formData.video]);

  const translateValue = (val) => {
    if (!isAr) return val;
    const translations = {
      'UAE': 'الإمارات',
      'Syria': 'سوريا',
      'Egypt': 'مصر',
      'Male': 'ذكر',
      'Female': 'أنثى'
    };
    return translations[val] || val;
  };

  return (
    <div className="magic-wrapper" dir={isAr ? 'rtl' : 'ltr'}>
      
      <div className="clouds-layer">
        <div className="cloud-item c1"></div>
        <div className="cloud-item c2"></div>
        <div className="cloud-item c3"></div>
      </div>

      <div className="magic-container animate-fade-in">
        <h2 className="pixel-title">
          {isAr ? 'عرض الملف الشخصي' : 'Profile Preview'}
        </h2>

        <div className="pixel-media-row">
          <div className="media-frame photo-frame">
            <span className="pixel-tag">{isAr ? 'صورة' : 'PHOTO'}</span>
            {mediaUrls.img ? <img src={mediaUrls.img} alt="User" /> : <div className="placeholder">∅</div>}
          </div>

          <div className="media-frame video-frame">
            <span className="pixel-tag">{isAr ? 'فيديو' : 'VIDEO'}</span>
            {mediaUrls.vid ? <video src={mediaUrls.vid} controls /> : <div className="placeholder">∅</div>}
          </div>
        </div>

        <div className="pixel-data-stack">
          {/* الاسم */}
          <div className="pixel-input-box">
            <span className="pixel-label">{isAr ? 'الاسم بالكامل' : 'FULL NAME'}</span>
            <p className="pixel-value">{formData.username || '---'}</p>
          </div>

          <div className="pixel-input-box">
            <span className="pixel-label">{isAr ? 'الموقع الحالي' : 'LOCATION'}</span>
            <p className="pixel-value">📍 {translateValue(formData.location) || '---'}</p>
          </div>

          <div className="pixel-input-box">
            <span className="pixel-label">{isAr ? 'الجنس' : 'GENDER'}</span>
            <p className="pixel-value">{translateValue(formData.gender) || '---'}</p>
          </div>

          {/* النبذة */}
          <div className="pixel-input-box bio-box">
            <span className="pixel-label">{isAr ? 'نبذة تعريفية' : 'ABOUT ME'}</span>
            <div className="pixel-value bio-scroll">
              {formData.bio || (isAr ? 'لا يوجد وصف.' : 'No bio.')}
            </div>
          </div>
        </div>

        <div className="magic-footer-block">
          <button className="magic-submit-btn" onClick={() => navigate('/')}>
            {isAr ? 'تعديل البيانات' : 'EDIT PROFILE'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewPage;