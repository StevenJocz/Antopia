
import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../../utilities"
import MiColonia from "./MiColonia/MiColonia"
import { Colonias } from "."
import DescubreColonias from "./DescubreColonias/DescubreColonias"


const ColoniaRouter = () => {
    return (
        <div>
            <RoutesWithNotFound>
                <Route path="/" element={<Colonias />} />
                <Route path="/DescubreColonias" element={<DescubreColonias/>} />
                <Route path="/:nombre/*" element={<MiColonia/>} />
            </RoutesWithNotFound>
        </div>
    )
}

export default ColoniaRouter