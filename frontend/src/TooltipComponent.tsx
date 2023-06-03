import {OverlayTrigger, Tooltip} from 'react-bootstrap'
import {InfoCircle} from 'react-bootstrap-icons'
import {ReactNode} from "react";

interface TooltipComponentProps {
    children: ReactNode
}

export function TooltipComponent(props: TooltipComponentProps): JSX.Element {
    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip id="button-tooltip">
                    {props.children}
                </Tooltip>}>
            <InfoCircle className="mx-3"/>
        </OverlayTrigger>
    )
}