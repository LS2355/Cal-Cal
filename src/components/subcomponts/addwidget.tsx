//adds more widgets    - by adding data to widgetData causing the page to rerender

interface WidgetInterface {
  w:number;
  h:number;
  content: string;
  x?:number;
  y?:number;

}


function addNewWidget (width:number, height:number, content: string, xPosition?:number , yPosition? : number){
    const WidgetObj: WidgetInterface = {
      w:width, h:height, content:content, x:xPosition, y:yPosition
    }     

    setWidgetData([WidgetObj])
    console.log(widgetData)
  }


  addNewWidget(1,2,"hghg",1,1)