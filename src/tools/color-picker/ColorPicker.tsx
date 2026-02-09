import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Box, InputAdornment } from "@mui/material";
import { CopyButton } from "../../components/tool/CopyButton";
import FormattedMessage from "../../components/FormattedMessage";
import { useI18n } from "../../utils/useI18n";

// Color conversion utilities
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

export const ColorPicker = () => {
  const [color, setColor] = useState("#1976d2");
  const [hexInput, setHexInput] = useState("#1976d2");
  const [rgbInput, setRgbInput] = useState("25, 118, 210");
  const [hslInput, setHslInput] = useState("207, 79%, 46%");

  const { t } = useI18n({ namespace: "tools" });

  // Update all formats when color changes
  const updateFromHex = useCallback((hexValue: string) => {
    const rgb = hexToRgb(hexValue);
    if (rgb) {
      setColor(hexValue);
      setHexInput(hexValue);
      setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHslInput(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
    }
  }, []);

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFromHex(e.target.value);
    },
    [updateFromHex]
  );

  const handleHexChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setHexInput(value);
      if (/^#[0-9A-F]{6}$/i.test(value)) {
        updateFromHex(value);
      }
    },
    [updateFromHex]
  );

  const handleRgbChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setRgbInput(value);
      const match = value.match(/(\d+),\s*(\d+),\s*(\d+)/);
      if (match) {
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        if (r <= 255 && g <= 255 && b <= 255) {
          const hex = rgbToHex(r, g, b);
          setColor(hex);
          setHexInput(hex);
          const hsl = rgbToHsl(r, g, b);
          setHslInput(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`);
        }
      }
    },
    []
  );

  const handleHslChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setHslInput(value);
      const match = value.match(/(\d+),\s*(\d+)%,\s*(\d+)%/);
      if (match) {
        const h = parseInt(match[1]);
        const s = parseInt(match[2]);
        const l = parseInt(match[3]);
        if (h <= 360 && s <= 100 && l <= 100) {
          const rgb = hslToRgb(h, s, l);
          const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
          setColor(hex);
          setHexInput(hex);
          setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
        }
      }
    },
    []
  );

  const adjustLightness = useCallback((delta: number) => {
    const match = hslInput.match(/(\d+),\s*(\d+)%,\s*(\d+)%/);
    if (match) {
      const h = parseInt(match[1]);
      const s = parseInt(match[2]);
      let l = parseInt(match[3]);
      
      // Adjust lightness by delta percent
      l = Math.max(0, Math.min(100, l + delta));
      
      const rgb = hslToRgb(h, s, l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      setColor(hex);
      setHexInput(hex);
      setRgbInput(`${rgb.r}, ${rgb.g}, ${rgb.b}`);
      setHslInput(`${h}, ${s}%, ${l}%`);
    }
  }, [hslInput]);

  const handleLighten = useCallback(() => {
    adjustLightness(10);
  }, [adjustLightness]);

  const handleDarken = useCallback(() => {
    adjustLightness(-10);
  }, [adjustLightness]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              style={{
                width: "80px",
                height: "80px",
                border: "2px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
            <Box
              sx={{
                flex: 1,
                height: "80px",
                backgroundColor: color,
                border: "2px solid #ddd",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
          </Box>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
            justifyContent: "center",
          }}
        >
          <TextField
            label={t("color-picker.hexLabel")}
            fullWidth
            variant="outlined"
            size="small"
            value={hexInput}
            onChange={handleHexChange}
            onFocus={(event) => event.target.select()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CopyButton text={hexInput} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label={t("color-picker.rgbLabel")}
            fullWidth
            variant="outlined"
            size="small"
            value={rgbInput}
            onChange={handleRgbChange}
            onFocus={(event) => event.target.select()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CopyButton text={rgbInput} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label={t("color-picker.hslLabel")}
            fullWidth
            variant="outlined"
            size="small"
            value={hslInput}
            onChange={handleHslChange}
            onFocus={(event) => event.target.select()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CopyButton text={hslInput} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Button
          color="primary"
          variant="contained"
          onClick={handleLighten}
          sx={{
            marginRight: { xs: 0, sm: 0.625 },
            marginBottom: { xs: 0.625, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormattedMessage namespace="tools" id="color-picker.lighten" />
        </Button>{" "}
        <Button
          color="primary"
          variant="contained"
          onClick={handleDarken}
          sx={{
            marginRight: { xs: 0, sm: 0.625 },
            marginBottom: { xs: 0.625, sm: 0 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <FormattedMessage namespace="tools" id="color-picker.darken" />
        </Button>
      </Grid>
    </Grid>
  );
};
