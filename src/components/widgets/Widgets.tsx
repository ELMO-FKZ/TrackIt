import { useContext, memo } from "react"
import { WidgetsProps } from "../../@types/project"
import { ProjectContext } from "../../contexts/ProjectContext"
import { ProjectType } from "../../@types/project"
import "./widgets.css"

function Widgets() {

    const { projects } = useContext(ProjectContext)

    const widgets: WidgetsProps[] = [
        { widgetColor: "white", widgetTitle: "To Do", widgetNumber: projects.filter((project: ProjectType) => project.status === "To Do").length },
        { widgetColor: "yellow", widgetTitle: "In Progress", widgetNumber: projects.filter((project: ProjectType) => project.status === "In Progress").length },
        { widgetColor: "red", widgetTitle: "Blocked", widgetNumber: projects.filter((project: ProjectType) => project.status === "Blocked").length },
        { widgetColor: "green", widgetTitle: "Completed", widgetNumber: projects.filter((project: ProjectType) => project.status === "Completed").length }
    ]

    return (
        <div className="main__widgets">
            {widgets.map((item, index) => {
                return (
                    <Widget
                        key={index}
                        widgetColor={item.widgetColor}
                        widgetTitle={item.widgetTitle}
                        widgetNumber={item.widgetNumber}
                    />
                );
            })}
        </div>
    )
}

const Widget = memo(function Widget({ widgetColor, widgetTitle, widgetNumber }: WidgetsProps) {

    return (
        <div className={`main__widget box box--${widgetColor} text-hover`}>
            <span className={`main__widget-arc main__widget-arc--${widgetColor}`}></span>
            <div className="main__widget-indicator">
                <span className="main__widget-number">{widgetNumber}</span>
                {widgetTitle}
            </div>
        </div>
    )
})

export default Widgets
