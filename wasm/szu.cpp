#include <emscripten.h>
#include <random>
#include <math.h>

constexpr int FLOAT_MIN = 0;
constexpr int FLOAT_MAX = 1;

extern "C" {
    struct WordPos{
        float x;
        float vx;
        float y;
        float vy;
        float z;
        float vz;
    }
    float getRand() {
        std::random_device rd;
        std::default_random_engine eng(rd());
        std::uniform_real_distribution<float> distr(FLOAT_MIN, FLOAT_MAX);
        return distr(eng);
    }

    int int_sqrt(int x) {
      return sqrt(x);
    }

    WordPos getWordPos(){
        WordPos pos;
        pos.x = getRand();
        pos.vx = getRand();
        pos.y = getRand();
        pos.vy = getRand();
        pos.z = getRand();
        pos.vz = getRand();
        return pos;
    }
}