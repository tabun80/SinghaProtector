import emotionReset from 'emotion-reset';
import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { css, Global } from '@emotion/core';

const globalCss = css`
  body {
    width: 340px;
  }
`;

const headerCss = css`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const logoCss = css`
  width: 32px;
  margin-right: 8px;
`;

const radioContainerCss = css`
  display: flex;
  align-items: center;
`;

const radioCss = css`
  display: none;

  &:checked+label {
    background-color: #88a8ee;
  }
`;

const labelCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 8px 12px;
  cursor: pointer;
  color: #fff;
  background-color: #888;
`;

const App = () => {
  const [active, setActive] = useState(false);
  const saveActive = (active: boolean) => {
    // @ts-ignore
    chrome.storage.sync.set({
      active,
    }, () => {
    });
  }
  const saveActiveOff = useCallback(() => {
    saveActive(false);
    setActive(false);
  }, []);
  const saveActiveOn = useCallback(() => {
    saveActive(true);
    setActive(true);
  }, []);

  useEffect(() => {
    // @ts-ignore
    chrome.storage.sync.get(['active'], (items) => {
      setActive(!!items.active);
    });
  }, []);
  return (
    <div>
      <Global
        styles={css`
          ${emotionReset}
          ${globalCss}
        `}
      />
      <h1 css={headerCss}>
        <img css={logoCss} src="../logo.png" />
        Singha Protector
      </h1>
      <div css={radioContainerCss}>
        <input css={radioCss} type="radio" id="on" name="active" checked={active} onClick={saveActiveOn} />
        <label css={labelCss} htmlFor="on">
          ON
        </label>
        <input css={radioCss} type="radio" id="off" name="active" checked={!active} onClick={saveActiveOff} />
        <label css={labelCss} htmlFor="off">
          OFF
        </label>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
