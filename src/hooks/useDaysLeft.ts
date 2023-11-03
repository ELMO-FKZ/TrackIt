import { useEffect, useState } from "react"
import { DaysLeftType } from "../@types/project";

const useDaysLeft = (endDate: string) => {

    const [daysLeft, setDaysLeft] = useState<DaysLeftType | null>(null)

    useEffect(() => {
        const currentDate = new Date();
        const targetDate = new Date(endDate);
        const differenceInTime = targetDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        setDaysLeft(differenceInDays);
    }, [endDate]);

    return [daysLeft]
}

export default useDaysLeft

