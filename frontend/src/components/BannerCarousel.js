import React from 'react';

const BannerCarousel = () => {
  return (
    <div style={{ display: 'flex', gap: '12px', padding: '16px', overflowX: 'auto', scrollbarWidth: 'none', background: '#f1f3f6', marginTop: '-12px' }}>
      <div style={{ flex: '0 0 calc(33.33% - 8px)', minWidth: '300px', borderRadius: '4px', overflow: 'hidden' }}>
        <img alt='Promo' src='https://rukminim2.flixcart.com/fk-p-flap/1000/400/image/d2ecfddf891a3922.jpg?q=90' style={{ width: '100%', display: 'block' }} />
      </div>
      <div style={{ flex: '0 0 calc(33.33% - 8px)', minWidth: '300px', borderRadius: '4px', overflow: 'hidden' }}>
        <img alt='Promo' src='https://rukminim2.flixcart.com/fk-p-flap/1000/400/image/31f7e3af490c225f.jpg?q=90' style={{ width: '100%', display: 'block' }} />
      </div>
      <div style={{ flex: '0 0 calc(33.33% - 8px)', minWidth: '300px', borderRadius: '4px', overflow: 'hidden' }}>
        <img alt='Promo' src='https://rukminim2.flixcart.com/fk-p-flap/1000/400/image/256fdf0144fd6d52.jpg?q=90' style={{ width: '100%', display: 'block' }} />
      </div>
    </div>
  );
};
export default BannerCarousel;
