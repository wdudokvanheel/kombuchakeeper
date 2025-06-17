import {Rating} from "@/models/batch"
import SmileyButton from "@/ui/components/smiley-button"
import {SmileyVariant} from "@/ui/graphics/smiley"
import React, {useState} from "react"
import {View} from "react-native"

type RatingsPanelProps = {
    rating: SmileyVariant | undefined
    onChange: (rating: Rating) => void
}

const RatingsPanel = ({rating, onChange}: RatingsPanelProps) => {
    const [value, setValue] = useState<Rating>(rating)

    const handleChange = (newRating: SmileyVariant) => {
        if (newRating === value) {
            setValue(undefined)
            onChange(undefined)
        } else {
            setValue(newRating)
            onChange(newRating)
        }
    }
    return (
        <View className="bg-brown-100 rounded-[2rem] flex-row justify-between px-12 py-4">
            {Object
                .values(SmileyVariant)
                .map(v =>
                    <SmileyButton
                        key={v}
                        size={56}
                        variant={v}
                        shaded={value !== undefined}
                        selected={value === v}
                        onSelect={handleChange}
                    />
                )
            }
        </View>
    )
}

export default RatingsPanel
