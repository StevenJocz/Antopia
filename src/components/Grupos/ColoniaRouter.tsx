
import { Route } from "react-router-dom"
import { RoutesWithNotFound } from "../../utilities"
import MiColonia from "./MiColonia/MiColonia"
import { Colonias } from "."
import DescubreColonias from "./DescubreColonias/DescubreColonias"
import { Helmet } from "react-helmet"


const ColoniaRouter = () => {
    return (
        <div>
            <Helmet>
                <title>Antopia | Colonias</title>
            </Helmet>
            <RoutesWithNotFound>
                <Route path="/" element={<Colonias />} />
                <Route path="/DescubreColonias" element={<DescubreColonias/>} />
                <Route path="/:nombre/*" element={<MiColonia/>} />
            </RoutesWithNotFound>
        </div>
    )
}

export default ColoniaRouter