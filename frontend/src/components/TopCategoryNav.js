import React from 'react';

const TOP_CATEGORIES = [
  'For You', 'Fashion', 'Mobiles', 'Beauty', 'Electronics', 'Home', 'Appliances', 
  'Toys, ba...', 'Food & H...', 'Auto Acc...', '2 Wheele...', 'Sports & ...', 
  'Books & ...', 'Furniture'
];

const TopCategoryNav = () => {
  return (
    <div style={{ 
      background: '#fff', 
      paddingTop: '16px', 
      paddingBottom: '16px', 
      position: 'relative', 
      top: '72px', 
      zIndex: 10,
      borderBottom: '1px solid #f0f0f0' 
    }}>
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        padding: '0 24px', 
        scrollbarWidth: 'none', 
        WebkitOverflowScrolling: 'touch', 
        gap: '24px' 
      }}>
        {TOP_CATEGORIES.map((name, i) => (
          <div key={i} style={{ 
            cursor: 'pointer',
            fontSize: '14px', 
            fontWeight: i === 0 ? '600' : '400', 
            color: i === 0 ? '#2874f0' : '#212121', 
            whiteSpace: 'nowrap',
            borderBottom: i === 0 ? '2px solid #2874f0' : 'none',
            paddingBottom: i === 0 ? '2px' : '0'
          }}>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategoryNav;

