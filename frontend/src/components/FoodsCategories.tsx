import { type ChangeEvent } from "react";
import { menu_list } from "../assets/assets"

type CatProps = {
  clickable?: boolean
  category?: string[]
  setCategory?: (param: string[]) => void
}

function FoodsCategories(props: CatProps) {

  function getValue(e: ChangeEvent<HTMLInputElement>){
    if(props.setCategory && props.category){
      if(e.currentTarget.checked){
        props.setCategory([...props.category, e.currentTarget.value]);
        return;
      }
      props.setCategory(props.category.filter(item => item !== e.currentTarget.value));
    }
    
  }

  return (
    <div className="flex overflow-x-auto whitespace-nowrap scroll-none w-full">
      <div className="w-full">
        {menu_list.map((item, index) => {
          return <div key={index} className="inline-flex flex-shrink-0 flex-col items-center justify-center gap-2 mr-10 last:mr-0">
            <div className="relative">
              <img src={item.menu_image} className="h-25"/>
              {props?.clickable ? <input type="checkbox" onChange={getValue} value={item.menu_name} className="absolute appearance-none inset-0 rounded-full checked:border-4 checked:border-orange-400 transition-all duration-200 cursor-pointer"/> : ""}
            </div>
                <p className="text-lg font-medium text-gray-500 text-center">{item.menu_name}</p>
              </div>
      })}
      </div>
      
    </div>
  )
}

export default FoodsCategories