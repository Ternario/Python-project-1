from menuFunction.MenuFunctions import MenuFunction

menu = {
    1: "1 -> Exit",
    2: "2 -> Search films by keyword",
    3: "3 -> Search films by genre and release year",
    4: "4 -> See top 10 queries"
}

if __name__ == "__main__":

    write_connector, read_connector = MenuFunction.init_app()

    menu_num = 0

    while True:
        for text in menu.values():
            print(text)

        menu_num = int(input("Enter a menu number: "))

        while menu_num > 4:
            print(f"Invalid number ({menu_num}), please enter the number from 1 to 4")
            menu_num = int(input("Enter a menu number: "))

        if menu_num == 1:
            MenuFunction.close_app(write_connector, read_connector)
            break

        elif menu_num == 2:
            while True:
                result = MenuFunction.get_film_by_keyword(write_connector, read_connector)
                if not result:
                    menu_num = 0
                    break

        elif menu_num == 3:
            while True:
                result = MenuFunction.get_film_by_genre_and_release_year(write_connector, read_connector)
                if not result:
                    menu_num = 0
                    break

        else:
            MenuFunction.get_top_search_query(write_connector)
