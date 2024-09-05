import React from "react";

const FlexboxDemo: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '3rem',
      marginTop: '1.5rem'
    }}>
      <h1 style={{ fontWeight: 'bold', color: 'darkblue' }}>Raw CSS Flexbox Demonstration</h1>
        <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        border: '5px solid darkblue',
      }}>
        <div style={flexItemStyle}>1</div>
        <div style={flexItemStyle}>2</div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        border: '5px solid darkred',
        gap: '1rem',
      }}>
        <div style={flexItemStyle}>A</div>
        <div style={flexItemStyle}>B</div>
        <div style={flexItemStyle}>C</div>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        border: '5px solid black',
        gap: '1rem',

      }}>
        <div style={flexItemStyle}>Alpha</div>
        <div style={flexItemStyle}>Beta</div>
        <div style={flexItemStyle}>Gamma</div>
        <div style={flexItemStyle}>Delta</div>
        <div style={flexItemStyle}>Epsilon</div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        gap: '1rem',
        border: '5px solid gray'
      }}>
        <div style={flexItemStyle}>Left</div>
        <div style={flexItemStyle}>Center</div>
        <div style={flexItemStyle}>Right</div>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100px',
        border: '5px solid lightblue',
        gap: '1rem'
      }}>
        <div style={flexItemStyle}>Top</div>
        <div style={{...flexItemStyle, height: '80px'}}>Middle</div>
        <div style={flexItemStyle}>Bottom</div>
      </div>
    </div>
  );
};

const flexItemStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '13rem',
  height: '50px',
  backgroundColor: '#0052cc',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '5px'
};

export default FlexboxDemo;