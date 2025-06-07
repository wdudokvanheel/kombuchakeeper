import {BrewState} from "@/models/brew";
import {NativeWindColors} from "@/ui/nativewind";

const BrewStateColor: Record<BrewState, string> = {
    [BrewState.F1]: NativeWindColors.yellow[400],
    [BrewState.F2]: NativeWindColors.orange[400],
    [BrewState.Bottled]: NativeWindColors.green[500],
    [BrewState.Failed]: NativeWindColors.gray[400],
}

export default BrewStateColor