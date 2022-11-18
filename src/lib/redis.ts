import {createClient} from "@redis/client";

import {REDIS_URL} from "@/constant/env";

export const client = createClient({
  url: REDIS_URL
});
