import React from 'react';
import Iridescence from './Iridescence';
import ASCIIText from './ASCIIText';

const Home = () => {
  return (
    <div>
      <Iridescence />
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <ASCIIText text='thealexwang' />
        <div style={{
          position: 'absolute',
          bottom: '8%',
          width: '100%',
          height: '45vh',
        }}>
          <ASCIIText text='aiatrogo' asciiFontSize={6} textFontSize={230} planeBaseHeight={4.5} />
        </div>
      </div>
    </div>
  );
};

export default Home;
