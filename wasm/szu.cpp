#include <emscripten.h>
//#include <emscripten/bind.h>
#include <random>

constexpr int FLOAT_MIN = 0;
constexpr int FLOAT_MAX = 1;

float EMSCRIPTEN_KEEPALIVE getRand() {
    std::random_device rd;
    std::default_random_engine eng(rd());
    std::uniform_real_distribution<float> distr(FLOAT_MIN, FLOAT_MAX);
    return distr(eng);
}


struct WordPos{
    float vx;
    float x;
    float vy;
    float y;
    float vz;
    float z;
};

struct EnvVars{
    float dampen;
    float canvas_width;
    float canvas_height;
    float magic1;
    float magic2;
    float magic3;
    float magic4;
};

float EMSCRIPTEN_KEEPALIVE getWordX(EnvVars vars, WordPos word_pos){
    
    float vx = word_pos.vx + (getRand() * vars.magic1 - vars.magic2);

    return getRand();
};

float EMSCRIPTEN_KEEPALIVE getWordY(EnvVars vars, WordPos word_pos){
    return 0;
};

float EMSCRIPTEN_KEEPALIVE getWordZ(EnvVars vars, WordPos word_pos){
    return 0;
};

int EMSCRIPTEN_KEEPALIVE SZU(){
    return 0;
};
/*
EMSCRIPTEN_BINDINGS(SZU) {
    emscripten::function("getWordX", &getWordX);
    emscripten::function("getWordY", &getWordY);
    emscripten::function("getWordZ", &getWordZ);
    emscripten::value_object<EnvVars>("EnvVars")
        .field("dampen", &EnvVars::dampen)
        .field("canvas_width", &EnvVars::canvas_width)
        .field("canvas_height", &EnvVars::canvas_height)
        .field("magic1", &EnvVars::magic1)
        .field("magic1", &EnvVars::magic1)
        .field("magic1", &EnvVars::magic1)
        .field("magic4", &EnvVars::magic4);
    emscripten::value_object<WordPos>("WordPos")
        .field("vx", &WordPos::vx)
        .field("x", &WordPos::x)
        .field("vy", &WordPos::vy)
        .field("y", &WordPos::y)
        .field("vz", &WordPos::vz)
        .field("z", &WordPos::z);
}
*/