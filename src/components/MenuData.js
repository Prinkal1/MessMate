const MenuData = ({menufetch}) => {
    return (
        <>
            {
                menufetch.map((menu) => {
                    const {Day, Breakfast, Lunch,Dinner,Sweet_dish} = menu;
                    

                    return (
                        <tr key={Day}>
                            <td>{Day}</td>
                            <td>{Breakfast}</td>
                            <td>{Lunch}</td>
                            <td>{Dinner}</td>
                            <td>{Sweet_dish}</td>
                        </tr>
                    )
                })

            }
        </>
    )
}
export default MenuData;