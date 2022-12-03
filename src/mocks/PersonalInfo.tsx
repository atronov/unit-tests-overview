import {usePersonalInfo} from './usePersonalInfo';

export const PersonalInfo = () => {
    const {isLoading, data} = usePersonalInfo();
    if (isLoading) {
        return <span title="loading">Loading...</span>;
    }
    return (
        <div>
            <span title="name">{data.name}</span>
            <span title="surname">{data.surname}</span>
            <span title="birthdate">{data.birthdate}</span>
        </div>
    )
};
