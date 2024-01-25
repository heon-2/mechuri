interface WheelData {
    option?: string;
    image?: ImageProps;
    style?: StyleType;
    optionSize?: number;
}

interface StyleType {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number | string;
    fontStyle?: string;
}

interface ImageProps {
    uri: string;
    offsetX?: number;
    offsetY?: number;
    sizeMultiplier?: number;
    landscape?: boolean;
}

interface PointerProps {
    src?: string;
    style?: React.CSSProperties;
}