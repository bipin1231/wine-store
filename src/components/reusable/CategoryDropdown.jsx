import React from 'react'
import { Dropdown,DropdownItem,DropdownMenu,DropdownTrigger,Button } from '@nextui-org/react'
function CategoryDropdown({category}) {
  return (
    <Dropdown backdrop="blur">
    <DropdownTrigger>
    
        <Button>
         {category.name}
        </Button>


    </DropdownTrigger>
    <DropdownMenu aria-label="Static Actions">
      {category.subCategories.map((subCat)=>(
      <DropdownItem key={subCat}>{subCat}</DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
  )
}

export default CategoryDropdown
