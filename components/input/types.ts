export interface inputProps {
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    secureTextEntry?: boolean
}