import {useI18n} from "@/utils/useI18n";

// TODO 1: Create a new component called FormattedDate
const FormattedDate = ({id, values, TagName = 'span', namespace = 'common'}) => {
    const {t} = useI18n({namespace});
    return t(id)
}

export default FormattedDate;