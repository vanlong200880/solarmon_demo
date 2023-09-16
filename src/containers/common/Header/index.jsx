// import React, { useEffect, useRef, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import './header.scss';
// import VN from '../../../assets/images/vn.png';
// import EN from '../../../assets/images/en.png';
// import Avatar from '../../../assets/images/avatar.jpg';
// import { useTranslation } from "react-i18next";


// const Header = () => {
//     const [menuProfile, setMenuProfile] = useState("");
//     const myRef = useRef();

//     const handleClickOutside = e => {
//         if (!myRef.current.contains(e.target)) {
//             setMenuProfile('');
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     });

//     const [t, i18n] = useTranslation('common');

//     return (
//         <div className="header">
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-2">
//                         <div className="logo">
//                             <span className="icon icon-menu"></span>
//                             <img src="/logo.png" alt="Logo" />
//                         </div>
//                     </div>
//                     <div className="col-md-10">
//                         <div className="menu-top">
//                             <ul ref={myRef}>
//                                 <li>
//                                     <NavLink onClick={(e) => { setMenuProfile('dashboard'); e.preventDefault(); }} className="round" to="/"><span className="icon icon-thumbnails"></span></NavLink>
//                                 </li>

//                                 <li>
//                                     <NavLink onClick={(e) => { e.preventDefault() }} className="avatar" to="/"><span><img src={Avatar} alt="Avatar" /></span></NavLink>
//                                 </li>
//                                 <li className="username">
//                                     <NavLink onClick={(e) => { e.preventDefault() }} className="avatar" to="/">Long Pham</NavLink>
//                                 </li>

//                                 <li>
//                                     <NavLink className="round" to="/"><span className="icon icon-alert"></span><var className="notification">5</var></NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink onClick={(e) => { setMenuProfile('setup'); e.preventDefault(); }} className="round" to="#"><span className="icon icon-settings-streamline-1"></span></NavLink>
//                                     {menuProfile === 'setup' ?
//                                         <ul className="on">
//                                             <li>
//                                                 <div className="item">
//                                                     <div className="main-item">
//                                                         <div className="header-avatar">
//                                                             <span><img src={Avatar} alt="Avatar" /></span>
//                                                         </div>

//                                                         <div className="channel-container">
//                                                             <p><strong>Pham Van Long</strong></p>
//                                                             <p><NavLink to="/">Quản lý tài khoản</NavLink></p>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 <div className="item-group">
//                                                     <NavLink to="/"><span className="icon icon-settings-streamline-1"></span> Trờ giúp</NavLink>
//                                                     <NavLink to="/"><span className="icon icon-question-circle"></span> Trờ giúp</NavLink>
//                                                     <NavLink to="/"><span className="icon icon-book"></span> Tài liệu hướng dẫn</NavLink>
//                                                     <NavLink to="/"><span className="icon icon-key"></span> Đổi mật khẩu</NavLink>
//                                                     <NavLink to="/"><span className="icon icon-logout"></span> Thoát khỏi tài khoản</NavLink>
//                                                 </div>
//                                             </li>
//                                         </ul>
//                                         : ""}
//                                 </li>
//                                 <li>
//                                     <NavLink to="/" onClick={(e) => { setMenuProfile('language'); e.preventDefault(); }}><img src={VN} alt="Việt Nam" />VN</NavLink>
//                                     {menuProfile === 'language' ?
//                                         <ul className="on language">
//                                             <li>
//                                                 <div className="item-group">
//                                                     <NavLink to="/" onClick={(e) => { i18n.changeLanguage('vi'); setMenuProfile(''); e.preventDefault(); }} ><img src={VN} alt="Việt Nam" /> Tiếng Việt</NavLink>
//                                                     <NavLink to="/" onClick={(e) => { i18n.changeLanguage('en'); setMenuProfile(''); e.preventDefault(); }} ><img src={EN} alt="English" /> English</NavLink>
//                                                 </div>
//                                             </li>
//                                         </ul>
//                                         : ''}

//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             <div className="main-menu-dashboard">
//                 <div className="item-dashboard">
//                     <div className="main-item">
//                         <h2>{t('common.crm')}</h2>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/">
//                                         <div className="menu-icon"><span className="icon-settings-streamline-1"></span></div>
//                                         <div className="menu-title">
//                                             Marketing
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-crm/customer-group">
//                                         <div className="menu-icon"><span className="icon-list-unordered"></span></div>
//                                         <div className="menu-title">
//                                             Nhóm khách hàng
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-crm/customer-type">
//                                         <div className="menu-icon"><span className="icon-equalizer"></span></div>
//                                         <div className="menu-title">
//                                             Loại khách hàng
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-crm/customer">
//                                         <div className="menu-icon"><span className="icon-man-people-streamline-user"></span></div>
//                                         <div className="menu-title">
//                                             Khách hàng
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="view-all"><NavLink to="/module-crm">Xem thêm <var className="icon-angle-right"></var></NavLink></div>
//                     </div>


//                     <div className="main-item">
//                         <h2>Kho hàng</h2>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-stores/stores">
//                                         <div className="menu-icon"><span className="icon-flow-tree"></span></div>
//                                         <div className="menu-title">
//                                             Chi nhánh
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-stores/import">
//                                         <div className="menu-icon"><span className="icon-import"></span></div>
//                                         <div className="menu-title">
//                                             Nhập kho
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-stores/export">
//                                         <div className="menu-icon"><span className="icon-export"></span></div>
//                                         <div className="menu-title">
//                                             Xuất kho
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-stores/summary">
//                                         <div className="menu-icon"><span className="icon-open-cardboard-box"></span></div>
//                                         <div className="menu-title">
//                                             Tồn kho
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="view-all"><NavLink to="/module-stores">Xem thêm <var className="icon icon-angle-right"></var></NavLink></div>
//                     </div>


//                     <div className="main-item">
//                         <h2>Sản phẩm</h2>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-products/categories">
//                                         <div className="menu-icon"><span className="icon-thumbnails"></span></div>
//                                         <div className="menu-title">
//                                             Danh mục
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-products/products">
//                                         <div className="menu-icon"><span className="icon-open-cardboard-box"></span></div>
//                                         <div className="menu-title">
//                                             Sản phẩm
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-products/attributes">
//                                         <div className="menu-icon"><span className="icon-tag-1"></span></div>
//                                         <div className="menu-title">
//                                             Thuộc tính
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-stores/summary">
//                                         <div className="menu-icon"><span className="icon-copyright"></span></div>
//                                         <div className="menu-title">
//                                             Thương hiệu
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="view-all"><NavLink to="/module-stores">Xem thêm <var className="icon icon-angle-right"></var></NavLink></div>
//                     </div>


//                     <div className="main-item">
//                         <h2>Bán hàng</h2>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-sell/search-bill">
//                                         <div className="menu-icon"><span className="icon-search"></span></div>
//                                         <div className="menu-title">
//                                             Tìm đơn hàng
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-sell/retail">
//                                         <div className="menu-icon"><span className="icon-caddie-shop-shopping-streamline"></span></div>
//                                         <div className="menu-title">
//                                             Bán lẻ
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-sell/wholesale">
//                                         <div className="menu-icon"><span className="icon-001-empty-shopping-cart"></span></div>
//                                         <div className="menu-title">
//                                             Bán sỉ
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-sell/return-order">
//                                         <div className="menu-icon"><span className="icon-left-arrow"></span></div>
//                                         <div className="menu-title">
//                                             Trả hàng
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="view-all"><NavLink to="/module-sell">Xem thêm <var className="icon icon-angle-right"></var></NavLink></div>
//                     </div>

//                     <div className="main-item">
//                         <h2>Báo cáo</h2>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-report/revenue">
//                                         <div className="menu-icon"><span className="icon-increase"></span></div>
//                                         <div className="menu-title">
//                                             Doanh thu
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-report/orders">
//                                         <div className="menu-icon"><span className="icon-caddie-shop-shopping-streamline"></span></div>
//                                         <div className="menu-title">
//                                             Đơn hàng
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-report/store-summary">
//                                         <div className="menu-icon"><span className="icon-open-cardboard-box"></span></div>
//                                         <div className="menu-title">
//                                             Tồn kho
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-report/gift">
//                                         <div className="menu-icon"><span className="icon-gift"></span></div>
//                                         <div className="menu-title">
//                                             Khuyến mãi
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="view-all"><NavLink to="/module-report">Xem thêm <var className="icon icon-angle-right"></var></NavLink></div>
//                     </div>

//                     <div className="main-item">
//                         <h2>Nhân sự</h2>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-hr/roles">
//                                         <div className="menu-icon"><span className="icon-flow-tree"></span></div>
//                                         <div className="menu-title">
//                                             Phòng ban
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-hr/permissions">
//                                         <div className="menu-icon"><span className="icon-equalizer"></span></div>
//                                         <div className="menu-title">
//                                             Phân quyền
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-hr/employees">
//                                         <div className="menu-icon"><span className="icon-man-people-streamline-user"></span></div>
//                                         <div className="menu-title">
//                                             Nhân viên
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-hr/position">
//                                         <div className="menu-icon"><span className="icon-list-unordered"></span></div>
//                                         <div className="menu-title">
//                                             Chức vụ
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="view-all"><NavLink to="/">Xem thêm <var className="icon icon-angle-right"></var></NavLink></div>
//                     </div>


//                     <div className="main-item">
//                         <h2>Website</h2>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-website/news">
//                                         <div className="menu-icon"><span className="icon-news"></span></div>
//                                         <div className="menu-title">
//                                             Tin tức
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-website/contact">
//                                         <div className="menu-icon"><span className="icon-phone"></span></div>
//                                         <div className="menu-title">
//                                             Liên hệ
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-website/tags">
//                                         <div className="menu-icon"><span className="icon-tag"></span></div>
//                                         <div className="menu-title">
//                                             Tags
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/module-website/comments">
//                                         <div className="menu-icon"><span className="icon-commenting-o"></span></div>
//                                         <div className="menu-title">
//                                             Bình luận
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="view-all"><NavLink to="/">Xem thêm <var className="icon icon-angle-right"></var></NavLink></div>
//                     </div>


//                     <div className="main-item">
//                         <h2>Hệ thống</h2>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/">
//                                         <div className="menu-icon"><span className="icon icon-settings-streamline-1"></span></div>
//                                         <div className="menu-title">
//                                             Cài đặt chung
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/">
//                                         <div className="menu-icon"><span className="icon-email-mail-streamline"></span></div>
//                                         <div className="menu-title">
//                                             Mẫu email
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/">
//                                         <div className="menu-icon"><span className="icon-print"></span></div>
//                                         <div className="menu-title">
//                                             Mẫu In
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>


//                             <div className="col-md-6">
//                                 <div className="item-group">
//                                     <NavLink to="/">
//                                         <div className="menu-icon"><span className="icon-happy-smiley-streamline"></span></div>
//                                         <div className="menu-title">
//                                             Gửi SMS
//                                                                     </div>
//                                     </NavLink>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="view-all"><NavLink to="/">Xem thêm <var className="icon icon-angle-right"></var></NavLink></div>
//                     </div>





//                 </div>

//             </div>

//         </div>

//     );
// };


// export default Header;
