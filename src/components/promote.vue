<template>
  <div class="result-box">
    <div class="title-box">
      <img src="@/assets/rectangle.png" alt="" />
      <span>{{ t("lemonaidea_title_imitation_result") }}</span>
    </div>
    <div class="result-list" v-for="(item, index) in source" :key="index">
      <div style="display: flex; flex-direction: column">
        <!-- :class="[isShowAll && indexTarget === index ? 'basic-result' : `result-span`]" -->
        <span class="basic-result">
          <span class="promote-span" v-html="item"></span>
          <!-- <MarkdownIt style="display:inline-block" :source="item" /> -->
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              @click="copyElement(index)"
              class="copy"
            >
              <!-- v-show="getActualWidthOfChars(item) < 650 || isShowAll" -->

              <path
                d="M10.6329 12.6834C10.6999 11.613 10.7351 10.5039 10.7351 9.36756C10.7351 8.90717 10.7293 8.45126 10.718 8.00059C10.71 7.68165 10.6065 7.37169 10.4177 7.11452C9.70336 6.14157 9.13366 5.53599 8.19603 4.81209C7.93646 4.61167 7.61785 4.50297 7.28999 4.49582C6.96384 4.48872 6.62326 4.48511 6.25952 4.48511C5.15827 4.48511 4.26935 4.51819 3.35021 4.58123C2.56177 4.63531 1.93557 5.26301 1.88619 6.05176C1.81916 7.12213 1.78394 8.23119 1.78394 9.36756C1.78394 10.5039 1.81916 11.613 1.88619 12.6834C1.93558 13.4721 2.56177 14.0998 3.35022 14.1539C4.26935 14.2169 5.15827 14.25 6.25952 14.25C7.36078 14.25 8.24969 14.2169 9.16883 14.1539C9.95727 14.0998 10.5835 13.4721 10.6329 12.6834Z"
                fill="#F5F5F5"
              />
              <path
                d="M10.6329 12.6834C10.6999 11.613 10.7351 10.5039 10.7351 9.36756C10.7351 8.90717 10.7293 8.45126 10.718 8.00059C10.71 7.68165 10.6065 7.37169 10.4177 7.11452C9.70336 6.14157 9.13366 5.53599 8.19603 4.81209C7.93646 4.61167 7.61785 4.50297 7.28999 4.49582C6.96384 4.48872 6.62326 4.48511 6.25952 4.48511C5.15827 4.48511 4.26935 4.51819 3.35021 4.58123C2.56177 4.63531 1.93557 5.26301 1.88619 6.05176C1.81916 7.12213 1.78394 8.23119 1.78394 9.36756C1.78394 10.5039 1.81916 11.613 1.88619 12.6834C1.93558 13.4721 2.56177 14.0998 3.35022 14.1539C4.26935 14.2169 5.15827 14.25 6.25952 14.25C7.36078 14.25 8.24969 14.2169 9.16883 14.1539C9.95727 14.0998 10.5835 13.4721 10.6329 12.6834Z"
                stroke="#8D8D8D"
                stroke-width="1.5"
              />
              <path
                d="M14.1138 9.94827C14.1808 8.8779 14.2161 7.76883 14.2161 6.63246C14.2161 6.17207 14.2103 5.71616 14.199 5.26549C14.1909 4.94654 14.0875 4.63658 13.8987 4.37941C13.1843 3.40646 12.6146 2.80088 11.677 2.07698C11.4174 1.87657 11.0988 1.76786 10.7709 1.76071C10.4448 1.75361 10.1042 1.75 9.74048 1.75C8.63922 1.75 7.75031 1.78308 6.83117 1.84613C6.04273 1.90021 5.41653 2.5279 5.36714 3.31665C5.30012 4.38702 5.26489 5.49608 5.26489 6.63246C5.26489 7.76883 5.30012 8.8779 5.36714 9.94827C5.41653 10.737 6.04273 11.3647 6.83117 11.4188C7.75031 11.4818 8.63922 11.5149 9.74048 11.5149C10.8417 11.5149 11.7306 11.4818 12.6498 11.4188C13.4382 11.3647 14.0644 10.737 14.1138 9.94827Z"
                fill="white"
                stroke="#8D8D8D"
                stroke-width="1.5"
              />
            </svg>
          </span>
          <!-- <v-md-preview class="basic-result" :text="item"></v-md-preview> -->
          <!-- <span class="basic-result" v-text="itemtest"></span> -->
        </span>
      </div>
      <!-- <a
        class="show-all"
        @click="handleShowMore(index)"
        v-if="getActualWidthOfChars(item) > 610"
        v-show="indexTarget !== index"
        >全文</a
      > -->
    </div>
    <div class="button-box">
      <button :disabled="isLoading" type="button" @click="handleChange">
        {{ isLoading ? $t("lemonaidea_thinking") : $t("lemonaidea_change") }}
        <img v-if="!isLoading" src="@/assets/arrow-white.png" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          v-if="isLoading"
        >
          <path
            d="M18.5 10C18.5 8.03354 17.8182 6.12775 16.5706 4.60766C15.3231 3.08756 13.587 2.04696 11.6583 1.66333C9.72956 1.27969 7.72746 1.57669 5.99315 2.50367C4.25884 3.43065 2.8996 4.93042 2.14705 6.74719C1.39449 8.56396 1.29518 10.5856 1.86603 12.4674C2.43688 14.3492 3.64258 15.975 5.27767 17.0675C6.91277 18.16 8.87612 18.6518 10.8332 18.4591C12.7902 18.2663 14.6199 17.4009 16.0104 16.0104"
            stroke="white"
            stroke-width="2"
            stroke-linecap="square"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

const props = withDefaults(
  defineProps<{
    source: Array<any>;
    oldSource: Array<any>;
    loading: boolean;
  }>(),
  {
    source: [] as any,
    oldSource: [] as any,
    loading: false,
  }
);
// const props = defineProps({
//   source: {
//     default: [] as any,
//     type: Array,
//   },
//   oldSource: {
//     default: [] as any,
//     type: Array,
//   },
//   loading: {
//     default: false,
//     type: Boolean,
//   },
// });

const { text, copy, copied, isSupported } = useClipboard({ legacy: true });

const emits = defineEmits(["change"]);
const indexTarget = ref(null);
// const itemtest = ref(
//   "Have you ever wondered why the ocean is not just a massive body of water but a mysterious world teeming with life and secrets waiting to be unveiled? 🌊 Let's dive deep into the enigmatic realm of the ocean and discover the astonishing reasons behind its captivating nature.\n Here are some intriguing facts to unravel the secrets of the ocean:\n\n- **The Abyssal Zone**: Imagine a place so deep in the ocean that sunlight can never reach it. This midnight zone, known as the abyssal zone, is a realm of darkness where peculiar creatures with mesmerizing adaptations roam. From anglerfish with glowing lures to bioluminescent jellyfish, this zone is a spectacle of evolutionary marvels. 🦑\n\n- **Marine Mysteries**: The ocean holds countless mysteries, like the Bermuda Triangle's vanishing ships and the enigmatic deep-sea giant squids that lurk in the depths. These mysteries fuel our imagination and remind us of how little we truly know about the vast ocean. 🌊\n\n- **Coral Reefs**: Vibrant and teeming with life, coral reefs are underwater cities that harbor a diverse array of marine species. These intricate ecosystems not only mesmerize us with their beauty but also play a crucial role in supporting marine life. 🐠\n\n- **Ocean Currents**: Beneath the tranquil surface, powerful ocean currents flow, shaping the world's climate and redistributing heat across the globe. From the warm Gulf Stream to the cold Antarctic Circumpolar Current, these movements regulate our planet's temperature. 🌍\n\n- **Sunken Treasures**: Throughout history, the ocean has been a silent witness to countless shipwrecks, leaving behind hidden treasures waiting to be discovered. From ancient artifacts to shipwrecked riches, these sunken treasures narrate tales of the past, adding an air of mystery to the ocean's depths. 💰\n\nThe ocean, with its endless depths and undiscovered wonders, continues to captivate and intrigue us, inviting us to explore its secrets further. So, next time you gaze upon the ocean's vastness, remember that beneath the surface lies a world full of surprises and mysteries waiting to be unraveled. 🐬\n\nAre you ready to plunge into the depths of the ocean and unlock its hidden secrets, or will you let its mysteries remain untouched in the deep blue? 🌊🔍"
// );
const handleChange = () => {
  emits("change");
  isShowAll.value = false;
  isLoading.value = true;
  indexTarget.value = null;
};
const getActualWidthOfChars = (text: any, options = {} as any) => {
  const { size = 14, family = "Microsoft YaHei" } = options;
  const canvas = document.createElement("canvas");
  const ctx: any = canvas.getContext("2d");
  ctx.font = `${size}px ${family}`;
  const metrics = ctx.measureText(text);
  const actual =
    Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight);
  console.log(Math.max(metrics.width, actual));
  return Math.max(metrics.width, actual);
};
const isShowAll = ref(false);
const isLoading = ref(false);
const handleShowMore = (index: any) => {
  indexTarget.value = index;

  isShowAll.value = true;
};
const copyElement = (index: any) => {
  ElMessage({
    message: t("lemonaidea_toast_copy_success"),
    type: "success",
  });
  copy(props.oldSource[index]);
};

watch(
  () => props.source,
  (val: any) => {
    if (val.length) {
      isLoading.value = false;
    }
  }
);
watch(
  () => props.loading,
  (val: any) => {
    if (val || !val) {
      isLoading.value = false;
    }
  }
);
const { locale, t } = useI18n();
</script>

<style lang="scss" scoped>
.result-box {
  width: 742px;
  min-height: 207px;
  flex-shrink: 0;
  border-radius: 40px;
  border: 1px solid #7730d0;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.05);
  margin-top: 24px;
  padding: 24px;
  svg {
    display: inline;
  }
  .title-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 16px;
  }
  img {
    width: 12px;
    height: 24px;
    flex-shrink: 0;
  }
  span {
    margin-left: 4px;
    color: #1d2331;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 133.333% */
  }

  .result-list {
    width: 694px;
    min-height: 44px;
    border-radius: 16px;
    background: rgba(119, 48, 208, 0.1);
    display: flex;
    align-items: center;
    padding: 0 14px;
    margin-bottom: 8px;
    line-height: 44px;
    justify-content: space-between;
    .basic-result {
      line-height: 22px;
      font-weight: normal;
      font-size: 16px;
      flex: 1;
      padding: 14px 0;
      position: relative;
    }
    .promote-span {
      color: #1d2331;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 137.5% */
    }
    .result-span {
      display: inline-block;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 610px;
      white-space: nowrap;
      line-height: 44px;
      font-weight: normal;
      font-size: 16px;
    }
    .show-all {
      font-weight: normal;
      font-size: 16px;
      cursor: pointer;
      text-decoration: underline;
      color: #7730d0;
    }
    .copy {
      cursor: pointer;
    }
  }
  .button-box {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-top: 24px;
    button {
      border-radius: 16px;
      background: #1e232d;
      color: #fff;
      display: flex;
      width: 200px;
      height: 48px;
      padding: 10px 26px;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      border-radius: 16px;
      font-family: Poppins;
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      img {
        width: 16.711px;
        height: 17.934px;
        flex-shrink: 0;
      }
    }
  }
}
</style>
