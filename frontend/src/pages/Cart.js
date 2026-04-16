import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CartLayout.css';

const fmt = (n) => `₹${Number(n).toLocaleString('en-IN')}`;
const disc = (p, o) => Math.round((1 - p / o) * 100) || 0;

const Cart = () => {
  const navigate = useNavigate();
  const { cart, cartSummary, removeItem } = useCart();
  const sliderRef = useRef(null);

  const total = parseFloat(cartSummary.total || 0);
  const savings = parseFloat(cartSummary.savings || 0);
  const originalTotal = total + savings;
  const platformFee = 7;
  const delivery = total > 500 ? 0 : 40;

  const handleSlideMissed = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const leftArrowsList = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: '#fff', borderBottom: '1px solid #f0f0f0', borderTop: '10px solid #f1f3f6' }}>
      <h2 style={{ fontSize: 20, margin: 0, fontWeight: 500, fontFamily: 'inter_semi_bold' }}>Items you may have missed</h2>
      <div>
        <button onClick={() => handleSlideMissed('left')} style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '6px 12px', cursor: 'pointer', borderRadius: 4, marginRight: 8 }}>&lt;</button>
        <button onClick={() => handleSlideMissed('right')} style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '6px 12px', cursor: 'pointer', borderRadius: 4 }}>&gt;</button>
      </div>
    </div>
  );

  return (
    <div className="cart-layout-container" style={{ backgroundColor: '#f1f3f6', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <div style={{ paddingTop: 180, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1128, margin: '0 auto', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          
          {/* LEFT PANE */}
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            
            {cart.length === 0 ? (
              <div style={{ background: '#fff', padding: '80px 24px', textAlign: 'center', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)' }}>
                <div style={{ fontSize: 80, marginBottom: 16 }}>🛒</div>
                <h2 style={{ fontSize: 18, fontWeight: 500, color: '#000', marginBottom: 12 }}>Your cart is empty!</h2>
                <button
                  onClick={() => navigate('/')}
                  style={{
                    background: '#2874f0', color: '#fff', border: 'none',
                    padding: '12px 72px', fontSize: 15, fontWeight: 500,
                    borderRadius: 2, cursor: 'pointer', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, .2)'
                  }}
                >Shop Now</button>
              </div>
            ) : (
              <>
                <div className="OmE16y" style={{"width": "100%", "position": "static"}}>
<div className="asbjxx" style={{"-SmOrder": "0", "-MdOrder": "0", "-LgOrder": "0", "height": "calc(100% - 10px)", "backgroundColor": "rgb(255, 255, 255)", "marginTop": "0px"}}>
<div data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="89fa17e0-9eb9-47c5-a452-2bbdf385f2fd">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr" style={{"backgroundColor": "rgb(255, 255, 255)", "margin": "0px 0px 10px", "boxShadow": "rgba(0, 0, 0, 0.15) 0px 4px 4px -2px"}}>
<div data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="fead19c9-0a64-4edc-a9f1-1abced1a88e4" style={{"height": "100%", "width": "100%"}}>
<div >
<div className="css-g5y9jx">
<div className="css-g5y9jx r-nsbfu8 r-13awgt0 r-18u37iz r-1wtj0ep r-1awozwy">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-13awgt0 r-18u37iz">
<div dir="auto" className="css-146c3p1 r-1kihuf0 r-9iso6 r-1rsjblm r-1et8rh5 r-1b43r93 r-1d4mawv" style={{"minWidth": "60px", "maxWidth": "138px", "backgroundColor": "rgba(0, 0, 0, 0)"}}>
																																		Deliver
																																		to:
																																	</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1h0z5md" style={{"minWidth": "138px"}}>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1kihuf0 r-9iso6 r-1vgyyaa r-1b43r93 r-1rsjblm r-1wbh5a2" style={{"backgroundColor": "rgba(0, 0, 0, 0)"}}>
																																			J
																																			Siva
																																			Sampreeth
																																		</div>
<div dir="auto" className="css-146c3p1 r-1kihuf0 r-9iso6 r-1vgyyaa r-1b43r93 r-1rsjblm r-1kb76zh" style={{"minWidth": "60px", "backgroundColor": "rgba(0, 0, 0, 0)"}}>
																																			,
																																			517541
																																		</div>
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1h7g6bg r-1et8rh5 r-1b43r93 r-14gqq1x">
																																	Academic
																																	Block,IIIT
																																	Sricity,
																																	630
																																	Gyan
																																	Marg
																																	Circle,Sricity,Andhrapradesh,
																																	Sricity
																																</div>
</div>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1kv57cf r-rs99b7 r-18u37iz r-1ow6zhx r-11f147o r-3pj75a" style={{"borderRadius": "4px"}}>
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1b43r93 r-1rsjblm" style={{"color": "rgb(42, 85, 229)"}}>
																																		Change
																																	</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx" style={{"height": "1px", "backgroundColor": "rgb(234, 234, 234)"}}>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
                {cart.map(item => (
                  <React.Fragment key={item.cart_id}>
                    <div className="OmE16y" style={{"width": "100%", "position": "static"}}>
<div className="asbjxx" style={{"-SmOrder": "1", "-MdOrder": "1", "-LgOrder": "1", "height": "calc(100% - 10px)", "backgroundColor": "rgb(241, 243, 246)", "marginTop": "0px"}}>
<div data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="346f5b4b-de32-485f-b16f-a9b1c269e6c2">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr" style={{"backgroundColor": "rgb(255, 255, 255)", "margin": "0px 0px 10px"}}>
<div data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="d71c27fd-3d80-45fc-9507-ddc8d74bf24e" style={{"height": "100%", "width": "100%"}}>
<div >
<div className="css-g5y9jx r-14lw9ot">
<div className="css-g5y9jx r-18u37iz r-1xpp3t0 r-1wzrnnt r-136ojw6">
<div className="css-g5y9jx r-136ojw6">
<div className="css-g5y9jx r-1awozwy r-1pz39u2 r-1h0z5md r-1b7u577">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-wy61xf r-1777fci r-1glkqn6 r-gu4u06 r-z2wwpe r-rs99b7 r-1udh08x">
<div style={{"display": "flex", "position": "relative", "marginLeft": "0px", "width": "72px", "height": "72px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="72" width="72" srcset={`${item.image} 1x`} src="{item.image}" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-1s2bzr4 r-136ojw6">
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-1kv57cf r-1jkafct r-rs99b7 r-18u37iz r-1777fci r-136ojw6 r-61z16t" style={{"width": "75px", "top": "0px", "height": "32px"}}>
<div className="css-g5y9jx">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx" style={{"width": "80px", "height": "32px"}}>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-15ysp7h r-1awozwy r-1777fci">
<div dir="auto" className="css-146c3p1 r-op4f77 r-1vgyyaa r-1b43r93 r-1rsjblm">
																																							Qty: {item.quantity}
																																						</div>
<div className="css-g5y9jx r-1awozwy r-1stjixc r-1xbve24 r-1jkjb r-1udh08x r-16eto9q">
<div className="css-g5y9jx r-1m9ckf1 r-3da1kt r-73fqs1 r-1jg9483">
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1habvwh r-1pz39u2 r-88pszg" style={{"width": "787px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1habvwh r-eqz5dr r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-cqee49 r-1et8rh5 r-ubezar" style={{"width": "551.111px"}}>
																																				{item.name}
																																			</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1h7g6bg r-1enofrn r-kc8jnq" style={{"width": "551.111px"}}>
																																				Size:
																																				30
																																			</div>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1777fci r-tskmnb">
<div dir="auto" className="css-146c3p1 r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1h7g6bg r-1et8rh5 r-1enofrn r-1d4mawv" style={{"maxWidth": "533.333px"}}>
																																						Seller:Vantage
																																						Sales
																																					</div>
<div style={{"display": "flex", "position": "relative", "height": "20px", "width": "60px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="20" width="60" srcset={`${item.image} 1x`} src="https://rukminim1.flixcart.com/www/120/40/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-1s2bzr4" style={{"width": "792px"}}>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md r-15zivkp">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1777fci r-1d4mawv">
<div className="css-g5y9jx r-1awozwy r-18u37iz">
<svg width="16" height="16" viewbox="0 0 12 12" fill="none">
<path d="M6.73461 1V8.46236L9.5535 5.63352L10.5876 6.65767L5.99384 11.2415L1.41003 6.65767L2.42424 5.63352L5.25307 8.46236V1H6.73461Z" fill="#008C00" />
</svg>
<div dir="auto" className="css-146c3p1" style={{"color": "rgb(17, 17, 18)"}}>
<span className="css-1jxf684 r-1rsjblm r-9iso6 r-1w427b9 r-11wrixw r-gy4na3" style={{"fontSize": "16px", "lineHeight": "24px", "fontFamily": "inter_semi_bold"}}>{disc(item.price, item.original_price)}%
																																							</span>
</div>
</div>
</div>
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1777fci r-1d4mawv">
<div dir="auto" className="css-146c3p1" style={{"color": "rgb(17, 17, 18)"}}>
<span className="css-1jxf684 r-1h7g6bg r-1rsjblm r-1d4mawv r-142tt33 r-1a2p6p6 r-9iso6" style={{"fontSize": "16px", "lineHeight": "24px", "fontFamily": "inter_semi_bold"}}>{fmt(item.original_price)}</span>
</div>
</div>
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1777fci r-1d4mawv">
<div className="css-g5y9jx" style={{"flexDirection": "row", "alignItems": "flex-end"}}>
<div dir="auto" className="css-146c3p1 r-op4f77 r-1rsjblm r-9iso6" style={{"fontSize": "18px", "fontFamily": "inter_semi_bold"}}>
																																							{fmt(item.price)}
																																						</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
</div>
<div style={{"marginBottom": "4px", "cursor": "pointer"}}>
<div className="css-g5y9jx">
<div data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="6db9ce3b-9a08-4564-8c39-fa1b93b941b5" style={{"height": "100%", "width": "100%"}}>
<div >
<div className="css-g5y9jx r-18u37iz r-1awozwy r-1w6e6rj">
<div style={{"display": "inline-flex", "position": "relative", "marginRight": "2px", "alignSelf": "center", "width": "39px", "height": "12px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="12" width="39" srcset={`${item.image} 1x`} src="https://rukminim1.flixcart.com/www/78/24/promos/25/06/2025/9a7159fa-4de3-4092-af10-c306d6fcc383.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
<div dir="auto" className="css-146c3p1" style={{"fontStyle": "normal", "backgroundColor": "rgba(0, 0, 0, 0)", "fontSize": "14px", "color": "rgb(22, 66, 185)", "fontFamily": "'Roboto Medium', Roboto-Medium, 'Droid Sans', HelveticaNeue-Medium, 'Helvetica Neue Medium', sans-serif-medium"}}>
																																							Buy
																																							at
																																							₹283
																																						</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-15zivkp r-14gqq1x">
<div className="css-g5y9jx r-18u37iz r-1w6e6rj r-obd0qt r-6koalj">
<div dir="auto" className="css-146c3p1 r-1et8rh5 r-1enofrn r-op4f77" style={{"backgroundColor": "rgba(0, 0, 0, 0)"}}>
																																				Or
																																				Pay
																																			</div>
<div dir="auto" className="css-146c3p1 r-1et8rh5 r-1enofrn r-op4f77" style={{"backgroundColor": "rgba(0, 0, 0, 0)"}}>
																																				₹315
																																				+
																																			</div>
<div style={{"display": "inline-flex", "position": "relative", "marginRight": "0px", "alignSelf": "center", "width": "12px", "height": "12px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="12" width="12" srcset={`${item.image} 1x`} src="https://rukminim1.flixcart.com/www/24/24/promos/18/07/2019/4aebbd99-7478-411e-aced-265e7722d18d.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
<div dir="auto" className="css-146c3p1 r-1et8rh5 r-1enofrn r-op4f77" style={{"backgroundColor": "rgba(0, 0, 0, 0)"}}>
																																				18
																																			</div>
</div>
</div>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-18u37iz">
<div dir="auto" className="css-146c3p1 r-1loqt21" style={{"color": "rgb(17, 17, 18)", "alignItems": "center", "justifyContent": "flex-start", "flexDirection": "row"}}>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="ee614686-4f2e-4c7f-b828-1a80fb5b018d" style={{"height": "100%", "width": "100%"}}>
<div >
<div className="css-g5y9jx" style={{"marginRight": "16px", "marginLeft": "16px"}}>
<div className="css-g5y9jx r-1q9bdsx r-rs99b7 r-1777fci r-1mmae3n r-3o4zer" style={{"backgroundColor": "rgb(255, 255, 255)", "borderColor": "rgb(216, 239, 254)", "marginTop": "16px"}}>
<div className="css-g5y9jx" style={{"flexDirection": "row", "justifyContent": "space-between", "alignItems": "center"}}>
<div className="css-g5y9jx r-18u37iz r-1awozwy r-1w6e6rj">
<div style={{"display": "inline-flex", "position": "relative", "marginRight": "12px", "alignSelf": "center", "width": "24px", "height": "24px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="24" width="24" srcset={`${item.image} 1x`} src="https://rukminim1.flixcart.com/www/48/48/promos/01/12/2025/e3ce3ac2-9481-49fb-8639-961bad46624e.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
<div dir="auto" className="css-146c3p1" style={{"fontStyle": "normal", "backgroundColor": "rgba(0, 0, 0, 0)", "fontSize": "14px", "color": "rgb(51, 51, 51)", "fontFamily": "inter_regular"}}>
																																						Save
																																						extra
																																					</div>
<div dir="auto" className="css-146c3p1" style={{"fontStyle": "normal", "backgroundColor": "rgba(0, 0, 0, 0)", "fontSize": "14px", "color": "rgb(51, 51, 51)", "fontFamily": "inter_semi_bold"}}>
																																						₹20
																																					</div>
<div dir="auto" className="css-146c3p1" style={{"fontStyle": "normal", "backgroundColor": "rgba(0, 0, 0, 0)", "fontSize": "14px", "color": "rgb(51, 51, 51)", "fontFamily": "inter_regular"}}>
																																						with
																																						Coupon
																																					</div>
</div>
<div className="css-g5y9jx" style={{"flexDirection": "row", "height": "20px"}}>
<div style={{"cursor": "pointer"}}>
<div dir="auto" className="css-146c3p1" style={{"color": "rgb(17, 98, 242)", "fontSize": "17px", "lineHeight": "24px", "fontFamily": "inter_semi_bold", "letterSpacing": "-0.01px"}}>
																																							Apply
																																						</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-f1odvy r-1xpp3t0 r-156q2ks">
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1habvwh r-eqz5dr r-1h0z5md">
<div className="css-g5y9jx" style={{"display": "flex", "alignItems": "flex-start"}}>
<div className="css-g5y9jx r-18u37iz r-1w6e6rj r-1h0z5md r-1awozwy" style={{"paddingTop": "2px", "paddingBottom": "2px"}}>
<div dir="auto" className="css-146c3p1 r-1et8rh5 r-1enofrn r-1cwl3u0 r-op4f77 r-1kihuf0">
																																				Delivery
																																				by
																																				Apr
																																				21,
																																				Tue
																																			</div>
<div dir="auto" className="css-146c3p1" style={{"color": "rgb(17, 17, 18)"}}>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1oszu61 r-18u37iz">
<div className="css-g5y9jx r-1awozwy r-5kz9s3 r-13l2t4g r-5kkj8d r-13awgt0 r-195d4m8 r-1777fci r-15zivkp r-14gqq1x r-bnwqim r-1ljd8xs r-is05cd">
<div style={{"flex": "1 1 0%", "flexDirection": "row", "alignSelf": "stretch", "alignItems": "center", "height": "46px", "justifyContent": "center", "cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-1pz39u2 r-13awgt0 r-18u37iz r-195d4m8 r-1777fci">
<div className="css-g5y9jx" style={{"marginRight": "8px"}}>
<svg width="16" height="16" viewbox="0 0 256 256">
<path fill="none" d="M0 0h256v256H0z" />
<path d="M208 216H48a8 8 0 0 1-8-8V72l16-32h144l16 32v136a8 8 0 0 1-8 8Z" fill="none" stroke="#717478" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
<path fill="none" stroke="#717478" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M94.1 150.1 128 184l33.9-33.9M128 104v80M40 72h176" />
</svg>
</div>
<div dir="auto" className="css-146c3p1" style={{"cursor": "pointer", "color": "rgb(113, 116, 120)", "flexShrink": "1", "textAlign": "center", "backgroundColor": "rgba(0, 0, 0, 0)", "fontSize": "17px", "lineHeight": "24px", "fontFamily": "inter_semi_bold", "letterSpacing": "-0.01px"}}>
																																				Save
																																				for
																																				later
																																			</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-1awozwy r-5kz9s3 r-13l2t4g r-5kkj8d r-13awgt0 r-195d4m8 r-1777fci r-15zivkp r-14gqq1x r-bnwqim">
<div style={{"flex": "1 1 0%", "flexDirection": "row", "alignSelf": "stretch", "alignItems": "center", "height": "46px", "justifyContent": "center", "cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-1pz39u2 r-13awgt0 r-18u37iz r-195d4m8 r-1777fci">
<div className="css-g5y9jx" style={{"marginRight": "8px"}}>
<svg width="16" height="16" viewbox="0 0 256 256">
<path fill="none" d="M0 0h256v256H0z" />
<path fill="none" stroke="#717478" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" d="M216 56H40M104 104v64M152 104v64M200 56v152a8 8 0 0 1-8 8H64a8 8 0 0 1-8-8V56M168 56V40a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v16" />
</svg>
</div>
<div dir="auto" className="css-146c3p1" style={{"cursor": "pointer", "color": "rgb(113, 116, 120)", "flexShrink": "1", "textAlign": "center", "backgroundColor": "rgba(0, 0, 0, 0)", "fontSize": "17px", "lineHeight": "24px", "fontFamily": "inter_semi_bold", "letterSpacing": "-0.01px"}}>
  <button onClick={() => removeItem(item.cart_id)} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: "pointer", width: "100%", border: "none" }} aria-label="Remove item" />

																																				Remove
																																			</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-1awozwy r-5kz9s3 r-13l2t4g r-5kkj8d r-13awgt0 r-195d4m8 r-1777fci r-15zivkp r-14gqq1x r-bnwqim">
<div style={{"flex": "1 1 0%", "flexDirection": "row", "alignSelf": "stretch", "alignItems": "center", "height": "46px", "justifyContent": "center", "cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-1pz39u2 r-13awgt0 r-18u37iz r-195d4m8 r-1777fci">
<div className="css-g5y9jx" style={{"marginRight": "8px"}}>
<svg width="16" height="16" viewbox="0 0 256 256">
<path fill="none" d="M0 0h256v256H0z" />
<path fill="none" stroke="#717478" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" d="m96 240 16-80-64-24L160 16l-16 80 64 24L96 240z" />
</svg>
</div>
<div dir="auto" className="css-146c3p1" style={{"cursor": "pointer", "color": "rgb(113, 116, 120)", "flexShrink": "1", "textAlign": "center", "backgroundColor": "rgba(0, 0, 0, 0)", "fontSize": "17px", "lineHeight": "24px", "fontFamily": "inter_semi_bold", "letterSpacing": "-0.01px"}}>
																																				Buy
																																				this
																																				now
																																			</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
                  </React.Fragment>
                ))}
              </>
            )}

            <div className="OmE16y" style={{"width": "100%", "position": "static"}}>
<div className="asbjxx" style={{"-SmOrder": "5", "-MdOrder": "5", "-LgOrder": "5", "height": "100%", "backgroundColor": "rgb(241, 243, 246)", "marginTop": "0px"}}>
<div data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="3dbdc942-a291-4ee4-b3b9-e7eecc55d29d">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr" style={{"backgroundColor": "rgb(255, 255, 255)"}}>
<a href="https://www.flipkart.com/fpg/cbc/store-page?productType=CC&utm_source=Cart_OTA&utm_source_context=Cart" style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-1777fci r-1udh08x" style={{"width": "800px"}}>
<div style={{"display": "flex", "position": "relative", "width": "400px", "height": "55.5px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="true" loading="eager" fetchpriority="auto" height="55.5" width="400" src="https://rukminim1.flixcart.com/www/800/112/promos/08/04/2026/feb9ca16-739d-48ff-9f01-e3a457b6da40.jpg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "cover"}} srcset="https://rukminim1.flixcart.com/www/400/56/promos/08/04/2026/feb9ca16-739d-48ff-9f01-e3a457b6da40.jpg?q=80 1x, https://rukminim1.flixcart.com/www/800/112/promos/08/04/2026/feb9ca16-739d-48ff-9f01-e3a457b6da40.jpg?q=60 2x, " />
</div>
</div>
</a></div>
</div>
</div>
</div>
            {leftArrowsList}
            <div className="OmE16y" style={{"width": "100%", "position": "static"}}>
<div className="asbjxx" style={{"-SmOrder": "6", "-MdOrder": "6", "-LgOrder": "6", "height": "calc(100% - 10px)", "backgroundColor": "rgb(241, 243, 246)", "marginTop": "0px"}}>
<div data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="44ab0026-626b-4e67-8540-598c5167f536">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr" style={{"backgroundColor": "rgb(255, 255, 255)", "margin": "0px 0px 10px"}}>
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="b8cbbddd-cad1-49a0-b78b-29cddeaa92dc">
<div >
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx" style={{"overflow": "hidden"}}>
<div className="css-g5y9jx r-1awozwy r-13awgt0 r-18u37iz r-1w6e6rj r-17s6mgv r-w7s2jr r-3pj75a">
<div className="css-g5y9jx" style={{"flex": "1 1 0%", "flexDirection": "row"}}>
<div className="css-g5y9jx" style={{"flex": "1 1 0%", "flexDirection": "column", "justifyContent": "center"}}>
<div dir="auto" className="css-146c3p1 r-op4f77 r-1vgyyaa r-ubezar r-1rsjblm">
																																			Items
																																			you
																																			may
																																			have
																																			missed
																																		</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-1habvwh r-eqz5dr r-1h0z5md r-13qz1uu" style={{"height": "320px"}}>
<div className="css-g5y9jx r-150rngu r-18u37iz r-16y2uox r-1wbh5a2 r-lltvgl r-buy8e9 r-agouwx r-3o4zer r-95jzfe r-5fjp4n r-13qz1uu r-2eszeu" ref={sliderRef}>
<div className="css-g5y9jx r-18u37iz r-16y2uox">
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="81473be7-ca3a-49ce-9cab-7a6cbf962609">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/track-pant/u/y/m/m-crisec1-povaxpo-original-imahct4wtnzf5vab.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/u/y/m/m-crisec1-povaxpo-original-imahct4wtnzf5vab.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/u/y/m/m-crisec1-povaxpo-original-imahct4wtnzf5vab.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								Povaxpo
																																								Solid
																																								Men
																																								White
																																								Track
																																								Pants
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹351
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													1099
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												68%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="2a6798a0-1c33-4dfe-870a-a568e6df3cbd">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/jean/k/a/u/34-fk-light-gry-28-garteen-original-imahjhqpmjkptwfz.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/jean/k/a/u/34-fk-light-gry-28-garteen-original-imahjhqpmjkptwfz.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/jean/k/a/u/34-fk-light-gry-28-garteen-original-imahjhqpmjkptwfz.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								GARTEEN
																																								Straight
																																								Fit
																																								Men
																																								Grey
																																								Jeans
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹423
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													2999
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												85%
																																												off
																																											</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="ed8e5427-9498-4268-9bed-0fc1623b143a">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/track-pant/q/q/f/xxl-8116-paralians-original-imahe2duzg3wsdvx.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/q/q/f/xxl-8116-paralians-original-imahe2duzg3wsdvx.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/q/q/f/xxl-8116-paralians-original-imahe2duzg3wsdvx.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								Paralians
																																								Solid
																																								Men
																																								Brown
																																								Track
																																								Pants
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹341
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													1299
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												73%
																																												off
																																											</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="fd1b6c9f-180e-4039-8176-c3ce304002e7">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/cargo/b/7/p/s-tp2-cargo-track-pant-uzarstyle-original-imahjyfp3byqssnb.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/cargo/b/7/p/s-tp2-cargo-track-pant-uzarstyle-original-imahjyfp3byqssnb.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/cargo/b/7/p/s-tp2-cargo-track-pant-uzarstyle-original-imahjyfp3byqssnb.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								UZARSTYLE
																																								Men
																																								Cargos
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹362
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													1299
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												72%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="cf3e9173-1731-4afd-93a2-6770b0209adc">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/cargo/n/i/h/l-in-ml-lower-01-bge-l-4249-metronaut-original-imahfv35zxfft2gy.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/cargo/n/i/h/l-in-ml-lower-01-bge-l-4249-metronaut-original-imahfv35zxfft2gy.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/cargo/n/i/h/l-in-ml-lower-01-bge-l-4249-metronaut-original-imahfv35zxfft2gy.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								METRONAUT
																																								Men's
																																								Polyester
																																								Drawstring
																																								Comfortable
																																								Loose
																																								Fit
																																								Trouser
																																								Pant
																																								Cargo
																																								Men
																																								Cargos
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹300
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													1499
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												79%
																																												off
																																											</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="be2202c0-3d76-4ad3-970d-0a4ac9bc66ac">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/track-pant/j/d/b/s-crisec1-povaxpo-original-imahct4wyzpgf7qw.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/j/d/b/s-crisec1-povaxpo-original-imahct4wyzpgf7qw.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/j/d/b/s-crisec1-povaxpo-original-imahct4wyzpgf7qw.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								Povaxpo
																																								Solid
																																								Men
																																								Black
																																								Track
																																								Pants
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹355
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													1099
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												67%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="0fc51911-2ab8-4f0f-b74f-f246a15b4dd8">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/track-pant/n/n/6/xxl-8116-paralians-original-imahe2dugu2dgsyg.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/n/n/6/xxl-8116-paralians-original-imahe2dugu2dgsyg.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/n/n/6/xxl-8116-paralians-original-imahe2dugu2dgsyg.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								Paralians
																																								Solid
																																								Men
																																								White
																																								Track
																																								Pants
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹342
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													1299
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												73%
																																												off
																																											</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="c6f56c89-f7d3-4cfd-9be5-40541a464d4d">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/track-pant/l/b/n/xl-pic-pt240e048-indiclub-original-imah8q22rv7ej62c.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/l/b/n/xl-pic-pt240e048-indiclub-original-imah8q22rv7ej62c.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/track-pant/l/b/n/xl-pic-pt240e048-indiclub-original-imah8q22rv7ej62c.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								INDICLUB
																																								Solid
																																								Men
																																								Green
																																								Track
																																								Pants
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹341
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													999
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												65%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="OmE16y" style={{"width": "100%", "position": "static"}}>
<div className="asbjxx" style={{"-SmOrder": "7", "-MdOrder": "7", "-LgOrder": "7", "height": "calc(100% - 10px)", "backgroundColor": "rgb(241, 243, 246)", "marginTop": "0px"}}>
<div data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="de85646e-a4dc-44fa-ab92-ed1cc64d5f46">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr" style={{"backgroundColor": "rgb(255, 255, 255)", "margin": "0px 0px 10px"}}>
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="aac39f24-5ec6-4024-86ad-916e50b7177a">
<div >
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx" style={{"overflow": "hidden"}}>
<div className="css-g5y9jx r-1awozwy r-13awgt0 r-18u37iz r-1w6e6rj r-17s6mgv r-w7s2jr r-3pj75a">
<div className="css-g5y9jx" style={{"flex": "1 1 0%", "flexDirection": "row"}}>
<div className="css-g5y9jx" style={{"flex": "1 1 0%", "flexDirection": "column", "justifyContent": "center"}}>
<div dir="auto" className="css-146c3p1 r-op4f77 r-1vgyyaa r-ubezar r-1rsjblm">
																																			Recently
																																			Viewed
																																		</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-1habvwh r-eqz5dr r-1h0z5md r-13qz1uu" style={{"height": "320px"}}>
<div className="css-g5y9jx r-150rngu r-18u37iz r-16y2uox r-1wbh5a2 r-lltvgl r-buy8e9 r-agouwx r-3o4zer r-95jzfe r-5fjp4n r-13qz1uu r-2eszeu" ref={sliderRef}>
<div className="css-g5y9jx r-18u37iz r-16y2uox">
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="44a36c5c-6704-4144-9a07-ea42b2f1fefa">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/shirt/h/l/1/xxl-surhi-sblue-line-u-turn-original-imahys8hdazbpuep.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/shirt/h/l/1/xxl-surhi-sblue-line-u-turn-original-imahys8hdazbpuep.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/shirt/h/l/1/xxl-surhi-sblue-line-u-turn-original-imahys8hdazbpuep.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								U
																																								TURN
																																								Men
																																								Checkered
																																								Casual
																																								Blue
																																								Shirt
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹399
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													1899
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												78%
																																												off
																																											</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="1869dd14-0976-47f0-8c1a-938b84958dd1">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/mobile/3/u/i/-original-imahkur3ethtv2hq.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/mobile/3/u/i/-original-imahkur3ethtv2hq.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/mobile/3/u/i/-original-imahkur3ethtv2hq.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								Samsung
																																								Galaxy
																																								F70e
																																								5G
																																								(Spotlight
																																								Blue,
																																								128
																																								GB)
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹14499
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													18999
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												23%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="d1225aa7-7fa8-47ed-b5cf-9e69e0f0e0de">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/tripod/tripod/d/a/n/camera-tripod-1-4-screw-for-camera-stabilizer-smartphone-handy-original-imahdgygnffrudmu.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/tripod/tripod/d/a/n/camera-tripod-1-4-screw-for-camera-stabilizer-smartphone-handy-original-imahdgygnffrudmu.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/tripod/tripod/d/a/n/camera-tripod-1-4-screw-for-camera-stabilizer-smartphone-handy-original-imahdgygnffrudmu.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								TripoElite
																																								Camera
																																								Mount
																																								Tripods
																																								Handheld
																																								Grip
																																								with
																																								1/4"
																																								Screw
																																								Tripod
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹486
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													999
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												51%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="997d9d77-a7c1-48d9-844c-9694af3164c1">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/keykscw0/tripod/tripod/w/v/g/gyzmofreakz-plastic-fully-flexible-foldable-octopus-mini-small-original-imafvgwdhtety6gy.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/keykscw0/tripod/tripod/w/v/g/gyzmofreakz-plastic-fully-flexible-foldable-octopus-mini-small-original-imafvgwdhtety6gy.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/keykscw0/tripod/tripod/w/v/g/gyzmofreakz-plastic-fully-flexible-foldable-octopus-mini-small-original-imafvgwdhtety6gy.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								gyzmofreakz
																																								Plastic
																																								Fully
																																								Flexible
																																								Foldable
																																								Tripod,
																																								Monopod,
																																								Monopod
																																								Kit,
																																								Tripod
																																								Ball
																																								Head,
																																								Tripod
																																								Bracket
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹336
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													999
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												66%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="fbe5f592-8210-451c-84e9-b264f170421f">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/dslr-camera/m/v/1/-original-imahhy8ynhh9atfd.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/dslr-camera/m/v/1/-original-imahhy8ynhh9atfd.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/dslr-camera/m/v/1/-original-imahhy8ynhh9atfd.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								Canon
																																								EOS
																																								R10
																																								Mirrorless
																																								Camera
																																								Body
																																								with
																																								RF-S
																																								18
																																								-
																																								150
																																								mm
																																								f/3.5
																																								-
																																								6.3
																																								IS
																																								STM
																																								Lens
																																								Kit
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹104990
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													119995
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												12%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="a3c8fe2f-a152-45f5-a604-b5285f501efe">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/arm-sleeve/9/w/y/free-no-1-fbur98-arm-sleeves-pk-1-msr-store-original-imahhf8rhhkbw3tr.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/arm-sleeve/9/w/y/free-no-1-fbur98-arm-sleeves-pk-1-msr-store-original-imahhf8rhhkbw3tr.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/arm-sleeve/9/w/y/free-no-1-fbur98-arm-sleeves-pk-1-msr-store-original-imahhf8rhhkbw3tr.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								MSR
																																								STORE
																																								Cotton
																																								Arm
																																								Sleeve
																																								For
																																								Men
																																								&
																																								Women
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹195
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													699
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												72%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="f91528d9-a9db-42cf-939a-097a1d4e5912">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/dslr-camera/o/m/s/eosr6-mark-ii-24-2-r6-mark-ii-canon-original-imagksyhfcvghhtp.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/dslr-camera/o/m/s/eosr6-mark-ii-24-2-r6-mark-ii-canon-original-imagksyhfcvghhtp.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/dslr-camera/o/m/s/eosr6-mark-ii-24-2-r6-mark-ii-canon-original-imagksyhfcvghhtp.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								Canon
																																								EOS
																																								R6
																																								Mark
																																								II
																																								Mirrorless
																																								Camera
																																								Body
																																								with
																																								24-105mm
																																								STM
																																								lens
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹184990
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													271995
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												31%
																																												off
																																											</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx">
<div style={{"height": "100%", "width": "100%"}} data-observerid-7c03ca23-5854-4c20-853f-1786b3759ed7="d8f12365-5ed3-428b-9c34-9f1707280fb0">
<div >
<div className="css-g5y9jx r-14ciuzs r-y3w9o3 r-1awozwy r-13awgt0 r-18u37iz r-1h0z5md r-13hce6t r-1d4mawv">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1h0z5md r-14lw9ot r-z2wwpe r-gu4u06 r-rs99b7 r-p1pxzi" style={{"height": "268px", "width": "148px"}}>
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx">
<div className="css-g5y9jx r-1awozwy r-1kihuf0 r-1m0slry r-1777fci r-y3w9o3">
<div style={{"display": "flex", "position": "relative", "width": "145px", "height": "148px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="148" width="145" srcset="https://rukminim1.flixcart.com/image/145/148/xif0q/shirt/p/c/w/3xl-pm3090906-yellow-pepe-jeans-original-imahby7k4e84xfpz.jpeg?q=80 1x, https://rukminim1.flixcart.com/image/290/296/xif0q/shirt/p/c/w/3xl-pm3090906-yellow-pepe-jeans-original-imahby7k4e84xfpz.jpeg?q=60 2x, " src="https://rukminim1.flixcart.com/image/290/296/xif0q/shirt/p/c/w/3xl-pm3090906-yellow-pepe-jeans-original-imahby7k4e84xfpz.jpeg?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udbk01 r-3s2u2q r-1iln25a r-1a2q9ou r-1enofrn r-1cwl3u0 r-8dgmk1 r-14gqq1x r-6m16eh" style={{"WebkitBoxOrient": "vertical", "overflow": "hidden", "WebkitLineClamp": "1"}}>
																																								Pepe
																																								Jeans
																																								Men
																																								Printed
																																								Casual
																																								White,
																																								Yellow
																																								Shirt
																																							</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-eqz5dr r-1habvwh r-1777fci">
<div className="css-g5y9jx r-1habvwh r-13awgt0 r-eqz5dr r-l00any r-8dgmk1 r-1irem4e">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1h0z5md">
<div className="css-g5y9jx r-13awgt0 r-eqz5dr">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-1w6e6rj r-rjixqe">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-op4f77 r-9iso6 r-rjixqe">
																																												₹1221
																																											</div>
<div className="css-g5y9jx r-18u37iz r-1h0z5md">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-1h7g6bg r-q4m81j r-142tt33 r-9iso6 r-1a2p6p6 r-1pcdyqj r-1cwl3u0">
																																													2599
																																												</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-13awgt0 r-18u37iz r-1awozwy r-knv0ih">
<div className="css-g5y9jx r-1awozwy r-18u37iz r-1d4mawv r-1h0z5md r-rjixqe r-10ptun7">
<div dir="auto" className="css-146c3p1 r-1vgyyaa r-1enofrn r-1rsjblm r-9iso6 r-1w427b9">
																																												53%
																																												off
																																											</div>
</div>
<div style={{"display": "flex", "position": "relative", "width": "60px", "height": "16px"}}>
<img alt="" className="" aria-busy="false" data-highres-loaded="false" loading="lazy" fetchpriority="auto" height="16" width="60" srcset="https://rukminim1.flixcart.com/www/60/16/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=80 1x, https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=60 2x, " src="https://rukminim1.flixcart.com/www/120/32/promos/25/06/2024/71af54bd-9160-41ff-81cc-c55e534dedeb.png?q=90" style={{"filter": "none", "opacity": "1", "transition": "filter 0.5s ease-in-out, opacity 0.5s ease-in-out", "width": "100%", "height": "100%", "margin": "auto", "objectFit": "contain"}} />
</div>
</div>
</div>
</div>
</div>
<div className="css-g5y9jx r-knv0ih r-6gpygo r-1jkjb">
<div className="css-g5y9jx r-6m16eh r-18u37iz r-1777fci">
<div style={{"cursor": "pointer"}}>
<div className="css-g5y9jx r-1awozwy r-14lw9ot r-z2wwpe r-rs99b7 r-18u37iz r-1777fci r-mabqd8 r-6m16eh r-knv0ih r-ebdqqy">
<div dir="auto" className="css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1dupt2p r-1vgyyaa r-1b43r93 r-1rsjblm r-rjixqe">
																																											Add
																																											to
																																											cart
																																										</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

            <div style={{ padding: '24px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/shield_b33c0c.svg" alt="Safe and secure" style={{ width: 29 }} />
              <div style={{ fontSize: 14, color: '#717478', fontWeight: 500, lineHeight: '1.4' }}>
                Safe and secure payments. Easy returns. <br/>100% Authentic products.
              </div>
            </div>

            {/* Sticky Place Order Bar */}
            {cart.length > 0 && (
              <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10,
                background: 'transparent', pointerEvents: 'none'
              }}>
                <div style={{ maxWidth: 1128, margin: '0 auto', display: 'flex', gap: 16 }}>
                  <div style={{
                    flex: 1, background: '#fff', padding: '16px 24px', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto',
                    boxShadow: '0 -2px 10px 0 rgba(0,0,0,.1)', borderTop: '1px solid #f0f0f0'
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: 14, color: '#878787', textDecoration: 'line-through', marginBottom: 2 }}>
                        {fmt(originalTotal)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 20, fontWeight: 700, color: '#212121' }}>{fmt(total + platformFee + delivery)}</span>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', border: '1px solid #878787', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#878787', fontWeight: 'bold' }}>i</div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/checkout')}
                      style={{
                        background: '#ffd814', color: '#000', border: 'none',
                        padding: '12px 64px', fontSize: 16, fontWeight: 600,
                        borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 5px 0 rgba(213,217,217,.5)',
                        fontFamily: 'inter_semi_bold'
                      }}
                    >Place Order</button>
                  </div>
                  <div style={{ width: 340, flexShrink: 0 }}></div> {/* Spacer for Right Pane */}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANE */}
          {cart.length > 0 && (
            <div style={{ width: 340, flexShrink: 0, position: 'sticky', top: 96 }}>
              <div style={{ background: '#fff', boxShadow: '0 1px 2px 0 rgba(0,0,0,.2)', borderRadius: 2 }}>
                <div style={{ padding: '13px 24px', borderBottom: '1px solid #f0f0f0' }}>
                  <span style={{ fontSize: 16, color: '#878787', fontWeight: 500, textTransform: 'uppercase' }}>Price details</span>
                </div>
                <div style={{ padding: '0 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 16, color: '#212121' }}>
                    <span>Price ({cart.length} items)</span>
                    <span>{fmt(originalTotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 16, color: '#212121' }}>
                    <span>Discount</span>
                    <span style={{ color: '#388e3c' }}>−{fmt(savings)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 16, color: '#212121' }}>
                    <span>Platform Fee</span>
                    <span>{fmt(platformFee)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 16, color: '#212121', borderBottom: '1px dashed #e0e0e0' }}>
                    <span>Delivery Charges</span>
                    <span style={{ color: '#388e3c' }}>{delivery === 0 ? 'Free' : fmt(delivery)}</span>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', fontSize: 18, color: '#212121', fontWeight: 500, borderBottom: '1px dashed #e0e0e0' }}>
                    <span>Total Amount</span>
                    <span>{fmt(total + platformFee + delivery)}</span>
                  </div>
                  
                  <div style={{ padding: '16px 0', fontSize: 16, color: '#388e3c', fontWeight: 500 }}>
                    You will save {fmt(savings)} on this order
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
