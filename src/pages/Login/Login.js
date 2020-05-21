import React from 'react';
import NumberFormat from 'react-number-format';

const Login = () => {
  const inputRef = React.useRef();
  const [isFocus, setFocus] = React.useState(false);
  const [position, setPosition] = React.useState(0);
  const [phoneNumber, setPhoneNumber] = React.useState('+1 (___) ___-____');

  const markString = (str, number, mark = '_') => {
    const numberMark = number - (str || '').length;
    if (numberMark <= 0) return str;
    return `${str || ''}${Array(numberMark).fill(mark).join('')}`;
  };

  const replacer = (_, p1, p2, p3) => {
    return `+1 (${markString(p1, 3)}) ${markString(p2, 3)}-${markString(p3, 4)}`.trim();
  };

  React.useEffect(() => {
    inputRef.current.selectionStart = position;
    inputRef.current.selectionEnd = position;
  }, [position, isFocus]);

  const setCursorPosition = (e) => {
    let start = e.target.selectionStart;
    if (start === 7 && position !== 8) setPosition(9);
    else if (start === 12 && position !== 13) setPosition(13);
    else setPosition(start);
  };

  const onChange = (e) => {
    setCursorPosition(e);
    const match = (e.target.value || '').match(/^\+1|(\d+)/g, '') || [];
    let phone = match?.[0] === '+1' ? match.slice(1) : match;
    phone = phone.join('');

    if (phone?.length > 10) phone = phone.slice(0, 10);
    if (!phone) {
      setTimeout(() => {
        setPosition(getIndex(phoneText));
      });
    }
    const phoneText = phone.replace(/(\d{3}|\d+)?(\d{3}|\d+)?(\d{4}|\d+)?/, replacer);
    setPhoneNumber(phoneText);
  };

  const getIndex = (phone) => {
    const match = (phone || phoneNumber).match(/\d(?!.*\d)/);
    const index = match?.index === 1 ? 4 : match?.index + 1;
    return index;
  };

  const onFocus = (e) => {
    setTimeout(() => {
      setFocus(true);
      setPosition(getIndex());
    });
  };

  const onClick = (e) => {
    setTimeout(() => {
      setFocus(!isFocus);
      setPosition(getIndex());
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 30 }}>
      <input
        autoFocus
        ref={inputRef}
        onChange={onChange}
        onFocus={onFocus}
        onClick={onClick}
        onBlur={() => setFocus(!isFocus)}
        style={{ height: 20 }}
        value={phoneNumber}
      />
      <NumberFormat format="+1 (###) ###-####" allowEmptyFormatting mask="_" />
    </div>
  );
};

export default Login;
