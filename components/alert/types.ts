export type AlertProps = {
    title: string;
    message: string;
    visible: boolean;
    onClose: () => void;
}