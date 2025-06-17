#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main() {
    int nombreMystere, nombreEntre, essais = 0;

    // Initialisation du générateur de nombre aléatoire
    srand(time(NULL));
    nombreMystere = rand() % 100 + 1;  // entre 1 et 100

    printf("🔢 Bienvenue dans le jeu du 'Devine le nombre' !\n");
    printf("🤖 J'ai choisi un nombre entre 1 et 100. À toi de jouer !\n");

    do {
        printf("👉 Entre un nombre : ");
        scanf("%d", &nombreEntre);
        essais++;

        if (nombreEntre < nombreMystere)
            printf("🔼 C'est plus grand !\n");
        else if (nombreEntre > nombreMystere)
            printf("🔽 C'est plus petit !\n");
        else
            printf("🎉 Bravo ! Tu as trouvé le nombre en %d essai(s) !\n", essais);

    } while (nombreEntre != nombreMystere);

    return 0;
}

