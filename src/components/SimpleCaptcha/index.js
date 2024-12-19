import React, { useState, useRef, useEffect } from "react";
import { CaptchaButton } from "../Buttons";
import { Input } from "../Inputs";

const SimpleCaptcha = ({ handleSubmit, setOpen }) => {
  const [captchaText, setCaptchaText] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [isVerified, setIsVerified] = useState(null);
  const canvasRef = useRef(null);
  const captchaInputInfo = {
    name: "captcha",
    type: "number",
  };

  const generateCaptchaText = () => {
    const characters =
      // "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      "0123456789";
    let text = "";
    for (let i = 0; i < 6; i++) {
      text += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return text;
  };

  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "50px Arial";
    ctx.textBaseline = "middle";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      const x = 10 + i * 40 + Math.floor(Math.random() * 10 - 5);
      const y = 65 + Math.floor(Math.random() * 10 - 5);

      ctx.save();

      const angle = Math.random() * 1.5 - 0.75;
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.fillStyle = "#7d7d7d";
      ctx.fillText(char, 0, 0);

      ctx.restore();
    }

    for (let i = 0; i < 100; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 300, Math.random() * 120);
      ctx.lineTo(Math.random() * 300, Math.random() * 120);
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.5)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  const refreshCaptcha = () => {
    const newCaptchaText = generateCaptchaText();
    setCaptchaText(newCaptchaText);
    drawCaptcha(newCaptchaText);
    setCaptchaValue("");
    setIsVerified(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleVerify();
    }
  };

  const handleVerify = (e) => {
    // e.preventDefault();
    setIsVerified(captchaValue === captchaText);
    if (captchaValue === captchaText) {
      handleSubmit();
    } else {
      const newCaptchaText = generateCaptchaText();
      setCaptchaText(newCaptchaText);
      drawCaptcha(newCaptchaText);
      setCaptchaValue("");
    }
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div className="videoPreviewContainer captcha">
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <span className="closeButton closeIcon" onClick={handleClose}>
          &times;
        </span>
      </div>
      <div className="alignCenter spaceBetween">
        <p className="x24Font_2">
          Введите цифры <br /> с картинки:
        </p>
        <canvas
          ref={canvasRef}
          width="240"
          height="120"
          style={{ border: "1px solid #ccc", backgroundColor: "#e7effd" }}
        />
      </div>
      <div style={{ textAlign: "right" }}>
        <span className="x24Font_2 recaptcha" onClick={refreshCaptcha}>
          получить другую картинку
        </span>
      </div>
      <div className="alignCenter spaceBetween">
        <p className="x24Font_2">Цифры с картинки: </p>
        <form style={{ width: "242px", padding: "10px 0" }}>
          <Input
            item={captchaInputInfo}
            handleChange={(e) => setCaptchaValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>
      <div style={{ textAlign: "right", paddingBottom: "10px" }}>
        {isVerified === true && (
          <p style={{ color: "green" }}>CAPTCHA Verified!</p>
        )}
        {isVerified === false && (
          <p style={{ color: "red" }}>Incorrect CAPTCHA. Try again.</p>
        )}
      </div>
      <CaptchaButton title="Войти" onClick={handleVerify}></CaptchaButton>
    </div>
  );
};

export default SimpleCaptcha;
