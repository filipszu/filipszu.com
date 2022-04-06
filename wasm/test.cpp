#include <stdio.h>
#include <emscripten.h>
#include <random>

constexpr int FLOAT_MIN = 0;
constexpr int FLOAT_MAX = 1;

std::random_device rd;
std::default_random_engine eng(rd());
std::uniform_real_distribution<float> distr(FLOAT_MIN, FLOAT_MAX);

extern "C" {
    float getRand(){
        return distr(eng);
    }
}