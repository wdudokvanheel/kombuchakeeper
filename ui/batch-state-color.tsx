import {BatchState} from "@/models/batch"
import {NativeWindColors} from "@/ui/nativewind"

const BatchStateColor: Record<BatchState, string> = {
    [BatchState.F1]: NativeWindColors.yellow[500],
    [BatchState.F2]: NativeWindColors.orange[400],
    [BatchState.Bottled]: NativeWindColors.green[500],
    [BatchState.Failed]: NativeWindColors.gray[400],
}

const BatchStateLabelColor: Record<BatchState, string> = {
    [BatchState.F1]: NativeWindColors.brown[800],
    [BatchState.F2]: NativeWindColors.white,
    [BatchState.Bottled]: NativeWindColors.white,
    [BatchState.Failed]: NativeWindColors.white,
}

export {BatchStateColor, BatchStateLabelColor}
